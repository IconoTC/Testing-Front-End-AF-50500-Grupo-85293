import { Outlet } from 'react-router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import './App.css';
import { Menu } from '../menu/menu';
import { MENU_OPTIONS } from '../../routes/routes';

export const App: React.FC = () => {
    const appTitle = 'Vite + React + TS - Demo 2';

    return (
        <>
            <Header title={appTitle}>
                <Menu options={MENU_OPTIONS}/>
            </Header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
