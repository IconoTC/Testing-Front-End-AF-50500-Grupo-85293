import { render, screen } from '@testing-library/react';
import { App } from './App';

vi.mock('../menu/menu');

describe('App Component', () => {
    beforeEach(() => {
        render(<App />);

    });

    test('renders correctly', () => {
        const element = screen.getByRole('main');
        expect(element).toBeInTheDocument();
    });
});
