import { getTransactions, getCategories, getAccounts, getAccountsTypes } from '../api';
import { calculateAmount } from '../utils';

export const fetchData = async (userId) => {
	const [categories, accounts, typeAccounts, transactionsAmount] = await Promise.all([
		getCategories(userId),
		getAccounts(userId),
		getAccountsTypes(),
		getTransactions(userId, '', '', {}),
	]);

	const newCategories = categories.categories.map((cat) => ({
		...cat,
		amount: calculateAmount(transactionsAmount.transactions, cat.id, 'category'),
	}));

	const newAccounts = accounts.accounts.map((acc) => ({
		...acc,
		amount: calculateAmount(transactionsAmount.transactions, acc.id, 'account'),
	}));

	const lastIncomeTransactions = transactionsAmount.transactions
		.filter(({ type }) => type === 'income')
		.slice(0, 3);

	const lastExpenseTransactions = transactionsAmount.transactions
		.filter(({ type }) => type === 'expense')
		.slice(0, 3);

	return {
		error: null,
		res: {
			categories: newCategories,
			accounts: newAccounts,
			typeAccounts,
			lastIncomeTransactions,
			lastExpenseTransactions,
		},
	};
};
