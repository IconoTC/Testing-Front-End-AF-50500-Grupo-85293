import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { LoggedUser } from './logged-user';
import {
    AppContext,
    type AppContextType,
} from '../../../../core/contest/contest';
import type { UseLogged } from '../../hooks/use-logged';

describe('LoggedUser component', () => {
    const contextMock: AppContextType = {
        user: {
            loading: false,
            error: null,
            user: null,
            manageStates: vi.fn(),
        } as UseLogged,
        theme: 'light',
        language: 'en',
    };

    beforeEach(() => {
        render(
            <AppContext.Provider value={contextMock}>
                <LoggedUser />
            </AppContext.Provider>
        );
    });

    test('The component render the obtained data (with waitFor)', async () => {
        const buttonElement = screen.getByText(/Iniciar sesión/i);
        await userEvent.click(buttonElement);

        expect(contextMock.user.manageStates).toHaveBeenCalled();

        // Inmediatamente después de hacer click,
        // debería aparecer el texto "Cargando..."
        // let textElement = screen.getByText(/cargando/i);
        // expect(textElement).toBeInTheDocument();

        // await waitFor(async () => {
        //     // Después de que se resuelva la promesa,
        //     // debería aparecer el texto "Usuario activo"
        //     textElement = screen.getByText(/usuario activo/i);
        //     expect(textElement).toBeInTheDocument();
        // });
    });

    test.skip('The component render the obtained data', async () => {
        const buttonElement = screen.getByText(/Iniciar sesión/i);
        await userEvent.click(buttonElement);
        // Inmediatamente después de hacer click,
        // debería aparecer el texto "Cargando..."
        let textElement = screen.getByText(/cargando/i);
        expect(textElement).toBeInTheDocument();
        // Después de que se resuelva la promesa,
        // debería aparecer el texto "Usuario activo"
        // Usamos findByText para esperar a que aparezca el elemento
        textElement = await screen.findByText(/usuario activo/i);

        expect(textElement).toBeInTheDocument();
    });

    test.skip('The component render the BAD data', async () => {
        const buttonElement = screen.getByText(/incorrecto/i);
        await userEvent.click(buttonElement);
        // Inmediatamente después de hacer click,
        // debería aparecer el texto "Cargando..."
        let textElement = screen.getByText(/cargando/i);
        expect(textElement).toBeInTheDocument();
        // Después de que se resuelva la promesa,
        // debería aparecer el texto "Usuario activo"
        // Usamos findByText para esperar a que aparezca el elemento
        textElement = await screen.findByText(/credenciales inválidas/i);

        expect(textElement).toBeInTheDocument();
    });
});
