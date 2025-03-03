import { request } from '../utils';
import { addNewAccount } from './add-new-account';
import { Dispatch } from 'redux';

interface NewAccountData {
	id?: string;
	userId: string;
	name: string;
	amount?: number;
	typeAccount: string;
	created_at?: string;
}

interface AccountResponse {
	data?: Account;
}

interface Account {
	id: string;
	userId: string;
	name: string;
	amount: number;
	type_accounts: string;
	created_at: string;
}

export const saveAccountAsync = (newAccountData: NewAccountData) => {
	return (dispatch: Dispatch) =>
		request('/api/account', 'POST', newAccountData).then((res: AccountResponse) => {
			if (res.data) {
				dispatch(addNewAccount(res.data));
			}
			return res;
		});
};
