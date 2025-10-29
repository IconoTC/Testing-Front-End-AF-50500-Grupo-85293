import { render, screen } from '@testing-library/react';
import { Header } from './header';

describe('Header Component', () => {
    test('should render header with given title', () => {
        const mockTitle = 'Test Header';
        render(<Header title={mockTitle} />);
        const element = screen.getByRole('heading', {
            level: 1,
            name: mockTitle,
        });
        expect(element).toBeInTheDocument();
    });
});
