import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormRegisterC } from './form-register-c';
import { registerUser } from '../../services/user-services';
import type { Mock } from 'vitest';

vi.mock('../../services/user-services');

const mockData = {
    username: 'Juan',
    email: 'juan@example.com',
    password: 'password123',
    isOkConditions: true,
    turn: 'M',
    course: 'R',
};

describe('FormRegisterC', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log');
        render(<FormRegisterC />);
        (registerUser as Mock).mockResolvedValue(undefined);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('should render correctly', () => {
        const formElement = screen.getByRole('form');
        expect(formElement).toBeInTheDocument();
    });

    test('should be completed by the user', async () => {
        const nameInput = screen.getByPlaceholderText(
            /nombre/i
        ) as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText(
            /email/i
        ) as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText(
            /password/i
        ) as HTMLInputElement;
        const conditionsCheckbox = screen.getByLabelText(
            /condiciones/i
        ) as HTMLInputElement;
        const turnRadioM = screen.getByLabelText(/mañana/i) as HTMLInputElement;
        const courseSelect = screen.getByLabelText(
            /curso/i
        ) as HTMLSelectElement;

        const submitButton = screen.getByRole('button', { name: /enviar/i });

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(conditionsCheckbox).toBeInTheDocument();
        expect(turnRadioM).toBeInTheDocument();
        expect(courseSelect).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        await userEvent.type(nameInput, mockData.username);
        await userEvent.type(emailInput, mockData.email);
        await userEvent.type(passwordInput, mockData.password);
        await userEvent.click(conditionsCheckbox);
        await userEvent.click(turnRadioM);
        await userEvent.selectOptions(courseSelect, mockData.course);

        await userEvent.click(submitButton);

        expect(registerUser).toHaveBeenCalledWith(mockData);
        expect(console.log).toHaveBeenCalledWith('Formulario enviado con éxito');
    });
});
