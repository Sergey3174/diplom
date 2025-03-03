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

interface Category {
	id: string;
	userId: string;
	name: string;
	type: string;
	amount: number;
}

interface Account {
	id: string;
	userId: string;
	name: string;
	amount: number;
	type_accounts: string;
	created_at: string;
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

export const saveTransactionAsync =
	(newTransactionData: newTransaction) => (dispatch: Dispatch) =>
		request('/api/transaction/', 'POST', newTransactionData).then((res) => {
			if (res) {
				if (res.category) {
					dispatch(updateCategory(res.category as Category)); // типизируем category
				}
				if (res.account) {
					dispatch(updateAccount(res.account as Account)); // типизируем account
				}
			}
			return res;
		});
