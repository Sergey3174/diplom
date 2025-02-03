export const calculateBalance = (arr) => arr.reduce((acc, { amount }) => acc + amount, 0);
