export const MONTHS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export const MONTHS_MMM: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const now = new Date().getUTCFullYear();
export const YEARS = Array(now - (now - 10)).fill('').map((v, idx) => now - idx);