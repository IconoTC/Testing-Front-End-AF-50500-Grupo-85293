import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Counter } from './counter';

describe('Counter component', () => {
    let element: HTMLElement;
    beforeEach(() => {
        render(<Counter />);
        element = screen.getByRole('button', { name: /count/i });
    });

    test('should render correctly with initial count', () => {
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('0');
    });
    test('should increment count on button click', async () => {
        act(() => {
            element.click();
        });
        expect(element).toHaveTextContent('1');
    });

    test('should increment count on button click with fireEvent', async () => {
        fireEvent.click(element);
        expect(element).toHaveTextContent('1');
    });

    test('should increment count on button click with userEvent', async () => {
        await userEvent.click(element);
        userEvent.click(element);
        expect(element).toHaveTextContent('1');
    });
});
