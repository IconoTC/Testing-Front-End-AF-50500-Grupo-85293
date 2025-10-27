import type { Mock } from 'vitest';
import { fetchDataPromise } from './05-async.js';

vi.mock('./05-async.js');

// vi.mock("./05-async.js", () => {
//     return {
//         fetchDataPromise: vi.fn().mockResolvedValue("mocked data"),
//     };
// });

describe('mocking modules example', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('should return mocked data from fetchDataPromise', async () => {
        (fetchDataPromise as Mock).mockResolvedValue('mocked data');
        const data = await fetchDataPromise();
        expect(data).toBe('mocked data');
        expect(fetchDataPromise).toHaveBeenCalledTimes(1);
    });

    test('should reject from fetchDataPromise', async () => {
        (fetchDataPromise as Mock).mockRejectedValue(new Error('mocked error'));
        await expect(fetchDataPromise()).rejects.toThrow('mocked error');
        expect(fetchDataPromise).toHaveBeenCalledTimes(1);
    });
});
