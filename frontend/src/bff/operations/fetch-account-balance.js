import { getTransactions } from '../api';

export const fecthAccountBalance = async (userId, accountId) => {
	const { transactions } = await getTransactions(
		userId,
		'',
		null,
		{ account: accountId },
		'asc',
	);
	console.log(transactions);
	const balanceDateTransactions = transactions.reduce(
		(acc, { transactionDate, amount, type }) => {
			const currentAmount = acc.currentAmount;
			const newAmount =
				type === 'income' ? currentAmount + amount : currentAmount - amount;

			acc.accTransactions.push({ transactionDate, balance: newAmount });
			acc.currentAmount = newAmount;

			return acc;
		},
		{ currentAmount: 0, accTransactions: [] },
	);
	return {
		error: null,
		res: balanceDateTransactions,
	};
};
