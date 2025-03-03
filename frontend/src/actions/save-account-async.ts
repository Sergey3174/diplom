import { request } from '../utils';
import { addNewAccount } from './add-new-account';
import { Dispatch } from 'redux';

interface NewAccountData {
	userId: string;
	name: string;
	typeAccount: string;
}

interface AccountResponse {
	data: NewAccountData;
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
