export const MONTHS_MMM: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const now = new Date().getUTCFullYear();
export const YEARS_YYYY = Array(now - (now - 10)).fill('').map((v, idx) => now - idx);