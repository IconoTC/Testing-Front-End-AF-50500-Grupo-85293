import React, { use } from 'react';
import type { Login } from '../../types/user';
import { Card } from '../../../../core/components/card/card';
import { AppContext } from '../../../../core/contest/contest';

const loggedUserMock: Login = {
    email: 'pepe@sample.com',
    passwd: '12345',
};

const invalidUserMock: Login = {
    email: 'rosa@sample.com',
    passwd: '12ñty5',
};

export const LoggedUser: React.FC = () => {
    const { loading, error, user, manageStates } = use(AppContext).user;
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
