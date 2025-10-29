import { render, screen } from "@testing-library/react";
import { Notes } from "./notes";

describe('Notes Component', () => {
    beforeEach(() => {
        render(<Notes />);
    });

    test('renders correctly', () => {
        const element = screen.getByRole('heading', { name: /notes/i });
        expect(element).toBeInTheDocument();
    });
});
