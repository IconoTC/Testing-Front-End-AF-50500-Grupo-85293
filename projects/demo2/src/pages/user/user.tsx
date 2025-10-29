import React from 'react';
import { FormRegisterC } from './components/register/form-register-c';
import { FormRegister } from './components/register/form-register';
import './user.css';

export const User: React.FC = () => {
    return (
        <section>
            <h2>User</h2>
            <div className="registers">
                <FormRegisterC />
                <FormRegister />
            </div>
        </section>
    );
};
