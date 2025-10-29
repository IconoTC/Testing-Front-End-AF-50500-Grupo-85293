import React from 'react';
import { Counter } from './components/counter/counter';

export const Home: React.FC = () => {
    return (
        <section>
            <h2>Home</h2>
            <Counter />
        </section>
    );
};
