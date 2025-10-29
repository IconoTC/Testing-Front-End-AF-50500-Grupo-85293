import { render, screen } from "@testing-library/react";
import { Home } from "./home";

describe('Home Component', () => {
    beforeEach(() => {
        render(<Home />);
    });

    test('renders correctly', () => {
        const element = screen.getByRole('heading', { name: /home/i });
        expect(element).toBeInTheDocument();
    });
});
