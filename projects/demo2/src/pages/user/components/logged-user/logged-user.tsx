import React, { useState } from 'react';
import type { Login, User } from '../../types/user';

import { Card } from '../../../../core/components/card/card';
import { loginUser } from '../../services/user-services';

const loggedUserMock: Login = {
    email: 'pepe@sample.com',
    passwd: '12345',
};

const invalidUserMock: Login = {
    email: 'rosa@sample.com',
    passwd: '12ñty5',
};


export const LoggedUser: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const manageStates = async (loginData: Login): Promise<void> => {
        setLoading(true);
        try {
            const user = await loginUser(loginData);
            setUser(user);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <button onClick={() => manageStates(loggedUserMock)}>
                Iniciar sesión ok
            </button>
               <button onClick={() => manageStates(invalidUserMock)}>
                Usuario incorrecto
            </button>

            {/* En lugar del botón, añadir el componente 
            con el formulario de login aquí */}

            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user && (
                <div>
                    <h4>Usuario activo:</h4>
                    <p>Id: {user.id}</p>
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </Card>
    );
};
