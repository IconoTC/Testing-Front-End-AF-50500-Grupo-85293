import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './core/components/app/App.tsx';

const root = document.getElementById('root');

if (!root) throw new Error('Failed to find the root element');

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>
);
