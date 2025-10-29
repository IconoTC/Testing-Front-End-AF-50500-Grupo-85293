import { render, screen } from "@testing-library/react";
import { About } from "./about";

describe('About Component', () => {
    beforeEach(() => {
        render(<About />);
    });

    test('renders correctly', () => {
        const element = screen.getByRole('heading', { name: /about/i });
        expect(element).toBeInTheDocument();
    });
});
