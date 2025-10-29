import { render, screen } from "@testing-library/react";
import { Card } from "./card";

describe('Card Component', () => {
    it('renders correctly with title', () => {
        render(<Card title="Test Title">Content</Card>);
        const element = screen.getByRole('region', { name: /card-title/i });
        expect(element).toHaveTextContent('Test Title');
        expect(element).toHaveTextContent('Content');
    });

    it('renders correctly without title', () => {
        render(<Card>Content</Card>);
        const element = screen.getByRole('region', { name: /card/i });
        expect(element).toHaveTextContent('Content');
    });
});
