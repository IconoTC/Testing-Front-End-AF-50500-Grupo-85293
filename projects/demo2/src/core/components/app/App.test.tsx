import { render, screen } from '@testing-library/react';
import { App } from './App';
import type { JSX } from 'react';
import { Header } from '../header/header';
import { Counter } from '../counter/counter';
import { Footer } from '../footer/footer';

vi.mock('../header/header', () => ({
    Header: vi.fn((): JSX.Element => <header>Mocked Header</header>),
}));
vi.mock('../counter/counter', () => ({
    Counter: vi.fn((): JSX.Element => <div>Mocked Counter</div>),
}));
vi.mock('../footer/footer', () => ({
    Footer: vi.fn((): JSX.Element => <footer>Mocked Footer</footer>),
}));

describe('App Component', () => {

    beforeEach(() => {
        render(<App />);
    });

    it('renders correctly', () => {
        screen.debug();
        const element = screen.getByRole('main');
        expect(element).toBeInTheDocument();
    });

    test('should render mocked Header', () => {
        const headerElement = screen.getByText(/header/i);
        expect(headerElement).toBeInTheDocument();
        expect(Header).toHaveBeenCalled();
    });
    test('should render mocked Counter', () => {
        const counterElement = screen.getByText(/counter/i);
        expect(counterElement).toBeInTheDocument();
        expect(Counter).toHaveBeenCalled();
    });

    test('should render mocked Footer', () => {
        const footerElement = screen.getByText(/footer/i);
        expect(footerElement).toBeInTheDocument();
        expect(Footer).toHaveBeenCalled();
    });
});
