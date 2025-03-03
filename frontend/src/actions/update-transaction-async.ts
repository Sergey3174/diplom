import { request } from '../utils';
import { updateAccount } from './update-account';
import { updateCategory } from './update-category';
import { Dispatch } from 'redux';

interface newTransaction {
	userId: string;
	accountId: string;
	categoryId: string;
	type: string;
	description: string;
	amount: number;
}

interface UpdateTransactionAsyncAction {
	idTransaction: string;
	newTransactionData: Transaction;
}

interface Account {
	id: string;
	userId: string;
	name: string;
	amount: number;
	type_accounts: string;
	created_at: string;
}

interface Category {
	id: string;
	userId: string;
	name: string;
	type: string;
	amount: number;
}

interface Transaction {
	id: string;
	userId: string;
	accountId: string;
	categoryId: string;
	type: string;
	description: string;
	amount: number;
	createdAt: string;
}

export const updateTransactionAsync =
	(
		idTransaction: string | undefined, // или number
		newTransactionData: newTransaction,
	) =>
	(dispatch: Dispatch) =>
		request(`/api/transaction/${idTransaction}`, 'PATCH', newTransactionData).then(
			(data) => {
				if (data) {
					if (data.newCategory) {
						data.newCategory.forEach((cat: Category) =>
							dispatch(updateCategory(cat)),
						);
					}
					if (data.newAccount) {
						data.newAccount.forEach((acc: Account) =>
							dispatch(updateAccount(acc)),
						);
					}
				}
				return data;
			},
		);
