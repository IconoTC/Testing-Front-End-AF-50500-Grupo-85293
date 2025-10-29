import React from 'react';
import './menu.css';
import { Link } from 'react-router';
import type { MenuOption } from '../../types/menu-options';


type Props = {
    options: MenuOption[];
};

export const Menu: React.FC<Props> = ({ options }) => {
    return (
        <nav>
            <ul>
                {options.map((option) => (
                    <li key={option.path}>
                        <Link to={option.path}>{option.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
