// Stubs -> Simular funciones o comportamientos
//      - Mocks -> Simular módulos o componentes completos
//      - Spies -> Observar y registrar llamadas a funciones reales

import type { Mock } from "vitest";

const mock: Mock = vi.fn();
const fn = (): void => undefined

describe("mock examples", () => {
    
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should call the mock function", () => {
        const result = mock();
        fn();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(result).toBeUndefined();
        // expect(fn).toHaveBeenCalled(); No se puede espiar una función normal
    });

    it("should make anything", async () => {
        mock.mockImplementation((value: number) => value);
        const result = mock(42);
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(42);
        expect(result).toBe(42);
    });
    
});


describe('using mocks with values to test a function', () => {
    test('la función es llamada con los argumentos correctos', () => {
        const myMock = vi
        .fn()
        .mockReturnValueOnce('mocked value')
        .mockReturnValueOnce(true);
        let result = myMock('arg1', 'arg2');
        expect(myMock).toHaveBeenCalledWith('arg1', 'arg2');
        expect(result).toBe('mocked value');
        result = myMock('arg1', 'arg2');
        expect(result).toBe(true);
        result = myMock('arg1', 'arg2');
        expect(result).toBeUndefined();
    });
});
