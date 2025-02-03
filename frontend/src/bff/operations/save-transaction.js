import {
	addTransaction,
	getAccounts,
	getCategories,
	getTransaction,
	getTransactions,
	updateTransaction,
} from '../api';
import { calculateAmount } from '../utils';

export const saveTransaction = async (newTransactionData) => {
	if (newTransactionData.id === '') {
		await addTransaction(newTransactionData);
		const [categories, accounts, transactions] = await Promise.all([
			getCategories(newTransactionData.userId),
			getAccounts(newTransactionData.userId),
			getTransactions(newTransactionData.userId),
		]);

		const newAccount = accounts.accounts.find(
			({ id }) => id === newTransactionData.accountId,
		);

		newAccount.amount = calculateAmount(
			transactions.transactions,
			newAccount.id,
			'account',
		);

		const newCategory = categories.categories.find(
			({ id }) => id === newTransactionData.categoryId,
		);

		newCategory.amount = calculateAmount(
			transactions.transactions,
			newCategory.id,
			'category',
		);

		return { res: { newAccount, newCategory } };
	} else {
		const [transaction] = await getTransaction(newTransactionData.id);
		await updateTransaction(newTransactionData);

		const [{ categories }, { accounts }, { transactions }] = await Promise.all([
			getCategories(newTransactionData.userId),
			getAccounts(newTransactionData.userId),
			getTransactions(newTransactionData.userId),
		]);

		let newCategory = null;
		let newAccount = null;

		if (transaction.categoryId !== newTransactionData.categoryId) {
			newCategory = categories
				.filter(
					({ id }) =>
						id === newTransactionData.categoryId ||
						id === transaction.categoryId,
				)
				.map((cat) => ({
					...cat,
					amount: calculateAmount(transactions, cat.id, 'category'),
				}));
		} else {
			newCategory = categories
				.filter(({ id }) => id === newTransactionData.categoryId)
				.map((cat) => ({
					...cat,
					amount: calculateAmount(transactions, cat.id, 'category'),
				}));
		}

		if (transaction.accountId !== newTransactionData.accountId) {
			newAccount = accounts
				.filter(
					({ id }) =>
						id === newTransactionData.accountId ||
						id === transaction.accountId,
				)
				.map((acc) => ({
					...acc,
					amount: calculateAmount(transactions, acc.id, 'account'),
				}));
		} else {
			newAccount = accounts
				.filter(({ id }) => id === newTransactionData.accountId)
				.map((acc) => ({
					...acc,
					amount: calculateAmount(transactions, acc.id, 'account'),
				}));
		}
		return { res: { newCategory, newAccount } };
	}
};
