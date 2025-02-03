import { deleteTransaction, getAccounts, getCategories, getTransactions } from '../api';
import { calculateAmount } from '../utils';

export const removeTransactionServer = async (params) => {
	await deleteTransaction(params.id);

	const [{ categories }, { accounts }, { transactions }] = await Promise.all([
		getCategories(params.userId),
		getAccounts(params.userId),
		getTransactions(params.userId),
	]);

	const newAccount = accounts.find(({ id }) => id === params.accountId);

	newAccount.amount = calculateAmount(transactions, newAccount.id, 'account');

	const newCategory = categories.find(({ id }) => id === params.categoryId);

	newCategory.amount = calculateAmount(transactions, newCategory.id, 'category');

	return {
		error: null,
		res: { newCategory, newAccount },
	};
};
