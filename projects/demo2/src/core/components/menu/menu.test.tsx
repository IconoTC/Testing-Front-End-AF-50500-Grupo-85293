import { render, screen } from "@testing-library/react";
import { Menu } from "./menu";
import { createRoutesStub } from "react-router";
import type { JSX } from "react";

const mockedMenuOptions = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
];

describe('Menu', () => {


    const Stub = createRoutesStub([
        { path: '/', Component: (): JSX.Element => <Menu options={mockedMenuOptions} /> },
    ]);

    beforeEach(() => {
        render(<Stub />);
    });

    test('renders menu options correctly', () => {
        // Test implementation
        const element = screen.getByRole('navigation');
        expect(element).toBeInTheDocument();

        mockedMenuOptions.forEach(option => {
            const linkElement = screen.getByText(option.label);
            expect(linkElement).toBeInTheDocument();
            expect(linkElement).toHaveAttribute('href', option.path);
        });
    });
});
