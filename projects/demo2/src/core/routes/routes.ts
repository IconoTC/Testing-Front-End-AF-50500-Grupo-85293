import type { RouteObject } from 'react-router';
import { App } from '../components/app/App';
import { Home } from '../../pages/home/home';
import type { MenuOption } from '../types/menu-options';

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/home',
                Component: Home,
                id: 'Home',
            },
            {
                path: '/about',
                lazy: {
                    Component: async () =>
                        (await import('../../pages/about/about')).About,
                },
                id: 'About',
            },
            {
                path: '/notes',
                lazy: {
                    Component: async () =>
                        (await import('../../pages/notes/notes')).Notes,
                },
                id: 'Notes',
            },
        ],
    },
];

export const MENU_OPTIONS: MenuOption[] = (routes[0].children as RouteObject[])
    .filter((child) => child.id !== undefined)
    .map((child) => {
        return { path: child.path as string, label: child.id as string };
    });
