import {render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe('Footer Component', () => {
    test('should render footer with correct text', () => {
        // Render the Footer component
       render(<Footer />);
       const element = screen.getByText(/click/i);
       expect(element).toBeInTheDocument();
       const elementByRole = screen.getByRole('contentinfo');
       expect(elementByRole).toBeInTheDocument();
    });
});
