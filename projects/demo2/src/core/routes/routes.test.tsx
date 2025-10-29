/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from './routes';
import { render, screen, waitFor } from '@testing-library/react';
import { Home } from '../../pages/home/home';
import { About } from '../../pages/about/about';
import { Notes } from '../../pages/notes/notes';

vi.mock('../../pages/home/home');
vi.mock('../../pages/about/about');
vi.mock('../../pages/notes/notes');

describe('Routes', () => {
    test('should route to root page', () => {
        const mockRouter = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={mockRouter} />);
        expect(Home).toHaveBeenCalled();
    });
    test('should route to home page', () => {
        const mockRouter = createMemoryRouter(routes, {
            initialEntries: ['/home'],
        });
        render(<RouterProvider router={mockRouter} />);
        expect(Home).toHaveBeenCalled();
    });

    test('should route to about page', async () => {
        const mockRouter = createMemoryRouter(routes, {
            initialEntries: ['/about'],
        });
        render(<RouterProvider router={mockRouter} />);
        await waitFor(() => {
            expect(About).toHaveBeenCalled();
        });
    });

    test('should route to notes page', async () => {
        const mockRouter = createMemoryRouter(routes, {
            initialEntries: ['/notes'],
        });
        render(<RouterProvider router={mockRouter} />);
        await waitFor(() => {
            expect(Notes).toHaveBeenCalled();
        });
    });

    test('should show 404 for unknown route', () => {
        const mockRouter = createMemoryRouter(routes, {
            initialEntries: ['/unknown'],
        });

        render(<RouterProvider router={mockRouter} />);
        const element = screen.getByText('404 Not Found')
        expect(element).toBeInTheDocument();
    });
});
