import React from 'react';
import './footer.css';

export const Footer: React.FC = () => {
    const message = 'Click on the Vite and React logos to learn more';

    return (
        <footer>
            <p className="read-the-docs">
                {message}
            </p>
        </footer>
    );
};
