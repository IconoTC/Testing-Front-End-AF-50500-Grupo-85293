import { add, multiply } from "./01-calc.js";

describe('Function add', () => {
    test('should add 2, 3 resulting 5', () => {
        expect(add(2, 3)).toBe(5);
    });
    test('should add 0, 0 resulting 0', () => {
        expect(add(0, 0)).toBe(0);
    });
    // test('should add -2, 3 resulting 1', () => {
    //     expect(add(-2, 3)).toBe(1);
    // });
    // test('should add 2.5, 3.6 resulting 6.1', () => {
    //     expect(add(2.5, 3.6)).toBe(6.1);
    // });
});

describe('Given function multiply', () => {
    describe('When called with 2 and 3', () => {
        test('Then it should return 6', () => {
            // Arrange
            const a = 2;
            const b = 3;

            // Act
            const result = multiply(a, b);

            // Assert
            expect(result).toBe(6);
        });
    });
});
