import { factorial } from './04-factorial.js';

const cases: [number, number][] = [
    [0, 1],
    [1, 1],
    [2, 2],
    [5, 120],
    [20, 2_432_902_008_176_640_000],
    [170, 7.257415615308004e306],
];

const casesObjects: { input: number; expected: number }[] = [
    { input: 0, expected: 1 },
    { input: 1, expected: 1 },
    { input: 2, expected: 2 },
    { input: 5, expected: 120 },
];

describe('Factorial', () => {
    describe('using array of test cases', () => {
        test.each(cases)(
            'factorial(%i) should return %i',
            (input, expected) => {
                expect(factorial(input)).toBe(expected);
            }
        );
    });

    describe('using objects of test cases', () => {
        test.each(casesObjects)(
            'factorial($input) should return $expected',
            ({ input, expected }) => {
                expect(factorial(input)).toBe(expected);
            }
        );
    });

    describe('error cases', () => {
        it('should throw an error for >= 170!', () => {
            expect(() => factorial(171)).toThrow();
        });

        it('should throw an error for -1!', () => {
            expect(() => factorial(-1)).toThrow();
        });

          it('should throw an error for 1.5!', () => {
            expect(() => factorial(1.5)).toThrow();
        });

        //   it('should return 120 for 5!', () => {
        //     expect(factorial(5)).toBe(120);
        //   });

        //   it('should return 24 for 4!', () => {
        //     expect(factorial(4)).toBe(24);
        //   });
    });
});
