import React from 'react';
import './card.css';

type Props = {
    title?: string;
} & React.PropsWithChildren;

export const Card: React.FC<Props> = ({ children, title }) => {
    return (
        <div className="card" role="region" aria-label={title ? 'card-title' : 'card'}>
            {title && <h2 className="card-title">{title}</h2>}
            {children}
        </div>
    );
};
