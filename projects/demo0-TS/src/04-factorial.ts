export const factorial = (n: number): number => {

    if (n > 170) {
        throw new Error('Input too large, result would exceed Number.MAX_VALUE');
    }

    if (n < 0) {
        throw new Error('Input must be a non-negative integer');
    }

    if (!Number.isInteger(n)) {
        throw new Error('Input must be an integer');
    }

    if (n === 0) {
        return 1;
    }

   for (let i = n - 1; i >= 1; i--) {
        n = n * i;
   }
   return n;
};
