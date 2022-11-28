export const MONTHS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


const now = new Date().getUTCFullYear();
export const YEARS = Array(now - (now - 20)).fill('').map((v, idx) => now - idx);

console.log({ YEARS })