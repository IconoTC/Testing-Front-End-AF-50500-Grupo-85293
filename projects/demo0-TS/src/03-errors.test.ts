const generateError = (): void => {
    throw new Error('Error a posta');
};

function makePossibleError(n: number): void {
    if (n > 1) {
        throw new Error('Error');
    }
}

test('toThrow', () => {
    expect(generateError).toThrow('Error a posta');
    expect(() => makePossibleError(2)).toThrow('Error');
});
