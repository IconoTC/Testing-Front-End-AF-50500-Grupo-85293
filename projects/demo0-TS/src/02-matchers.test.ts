describe('Matchers de igualdad y veracidad', () => {
    test('toBe', () => {
        expect(1 + 2).toBe(3);
    });
    test('toEqual', () => {
        expect({ a: 1 }).toEqual({ a: 1 });
    });
    test('toBeNull', () => {
        expect(null).toBeNull();
    });
    test('toBeUndefined', () => {
        expect(undefined).toBeUndefined();
    });
    test('toBeDefined', () => {
        expect(1).toBeDefined();
    });
    test('toBeTruthy', () => {
        expect(true).toBeTruthy();
        expect(1).toBeTruthy();
        expect('hello').toBeTruthy();
    });
    test('toBeFalsy', () => {
        expect(false).toBeFalsy();
        expect(0).toBeFalsy();
        expect('').toBeFalsy();
    });
});

describe('Matchers de comparación de números', () => {
    test('toBeGreaterThan', () => {
        expect(3).toBeGreaterThan(2);
    });
    test('toBeGreaterThanOrEqual', () => {
        expect(3).toBeGreaterThanOrEqual(3);
    });
    test('toBeLessThan', () => {
        expect(2).toBeLessThan(3);
    });
    test('toBeLessThanOrEqual', () => {
        expect(2).toBeLessThanOrEqual(2);
    });
    test('toBeCloseTo', () => {
        expect(0.1 + 0.2).toBeCloseTo(0.3);
    });
});

describe('Matchers de comparación de otros tipos de valores', () => {
    test('toBeInstanceOf', () => {
        expect(new Date()).toBeInstanceOf(Date);
    });
    test('toMatch', () => {
        expect('abc').toMatch(/a/);
    });
    test('toContain', () => {
        expect([1, 2, 3]).toContain(2);
    });
    test('toHaveLength', () => {
        expect('abc').toHaveLength(3);
    });
});
