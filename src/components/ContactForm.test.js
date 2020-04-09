import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";
import { act } from "react-dom/test-utils";

test("Inputs Are Visible", () => {
	const { getByLabelText } = render(<ContactForm />);
	getByLabelText(/first name/i);
	getByLabelText(/last name/i);
	getByLabelText(/email/i);
	getByLabelText(/message/i);
});

test("Form Works", async () => {
	
	await act(async () => {
		const { getByLabelText, getByText, getByTestId } = render(<ContactForm />);

		const firstNameInput = getByLabelText(/first name/i);
		const lastNameInput = getByLabelText(/last name/i);
		const emailInput = getByLabelText(/email/i);
		const messageInput = getByLabelText(/message/i);
		
		fireEvent.change(firstNameInput, {
			target: {
				value: "Alexander",
			},
		});
		fireEvent.change(lastNameInput, {
			target: {
				value: "Besse",
			},
		});
		fireEvent.change(emailInput, {
			target: {
				value: "abesse@test.com",
			},
		});
		fireEvent.change(messageInput, {
			target: {
				value: "This is my message",
			},
		});
		
		expect(firstNameInput.value).toBe("Alexander");
		expect(lastNameInput.value).toBe("Besse");
		expect(emailInput.value).toBe("abesse@test.com");
		expect(messageInput.value).toBe("This is my message");
		
		// Click the submit button.
		fireEvent.click(getByTestId(/submit/i));
	})
	
});
