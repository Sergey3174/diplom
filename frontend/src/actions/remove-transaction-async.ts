import { string } from 'yup';
import { request } from '../utils';
import { updateAccount } from './update-account';
import { updateCategory } from './update-category';
import { Dispatch } from 'redux';

interface Account {
	id: string;
	userId: string;
	name: string;
	amount: number;
	type_accounts: string;
	created_at: string;
}

interface Category {
	amount: number;
	id: string;
	name: string;
	type: string;
	userId: string;
}

interface TransactionResponse {
	data: {
		account: Account;
		category: Category;
	};
}

export const removeTransactionAsync =
	(id: string | undefined): any =>
	(dispatch: Dispatch) => {
		return request(`/api/transaction/${id}`, 'DELETE').then(
			(res: TransactionResponse) => {
				dispatch(updateCategory(res.data.category));
				dispatch(updateAccount(res.data.account));
			},
		);
	};
