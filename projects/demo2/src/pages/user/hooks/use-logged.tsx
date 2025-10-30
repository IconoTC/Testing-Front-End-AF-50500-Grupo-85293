import { useState } from 'react';
import type { Login, User } from '../types/user';
import { loginUser } from '../services/user-services';

export type UseLogged = {
    loading: boolean;
    error: string | null;
    user: User | null;
    manageStates: (loginData: Login) => Promise<void>;
};

export const useLogged = (): UseLogged => {
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

    return { loading, error, user, manageStates };
};
