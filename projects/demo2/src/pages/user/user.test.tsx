import { render, screen } from "@testing-library/react";
import { User } from "./user";

describe('User Component', () => {
    beforeEach(() => {
        render(<User />);
    });

    test('renders correctly', () => {
        const element = screen.getByRole('heading', { name: /user/i });
        expect(element).toBeInTheDocument();
    });
});
