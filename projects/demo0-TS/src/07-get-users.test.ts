import type { Mock } from 'vitest';
import { getUserByAxios, getUsersByFetch, type User } from './07-get-users.js';
import axios, { type AxiosResponse } from 'axios';

vi.mock('axios');

const mockUser: User = { id: '1', name: 'Pepe Pérez' };

describe('getUserByAxios', () => {
    test('should return a list of users', async () => {
        const mockResponse: AxiosResponse<User[]> = {
            data: [mockUser],
        } as AxiosResponse<User[]>;

        (axios.get as Mock).mockResolvedValueOnce(mockResponse);
        const users = await getUserByAxios();
        expect(users).toBeDefined();
        expect(users).toEqual([mockUser]);
    });
});

describe('getUsersByFetch', () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });

    test('should return a list of users', async () => {

        (globalThis.fetch as Mock).mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce([mockUser]),
        } as unknown as Response);

        const users = await getUsersByFetch();
        expect(users).toBeDefined();
        expect(users).toEqual([mockUser]);
    });

    test('should throw an error when response is not ok', async () => {

        (globalThis.fetch as Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
        } as unknown as Response);

        await expect(getUsersByFetch()).rejects.toThrow('HTTP error! status: 500');
    });
});
