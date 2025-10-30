import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './core/routes/routes.ts';
import { AppProvider } from './core/contest/provider.tsx';

const root = document.getElementById('root');
const appRouter = createBrowserRouter(routes);

if (!root) throw new Error('Failed to find the root element');

createRoot(root).render(
    <StrictMode>
        <AppProvider>
            <RouterProvider router={appRouter} />
        </AppProvider>
    </StrictMode>
);
