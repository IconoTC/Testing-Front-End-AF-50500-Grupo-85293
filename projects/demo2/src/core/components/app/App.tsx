import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Counter } from '../counter/counter';
import './App.css';

export const App: React.FC = () => {
    const appTitle = 'Vite + React + TS - Demo 2';

    return (
        <>
            <Header title={appTitle} />
            <main>
                <Counter />
            </main>
            <Footer />
        </>
    );
};
