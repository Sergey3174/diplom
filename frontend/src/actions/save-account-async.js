import { request } from '../utils';
import { addNewAccount } from './add-new-account';

export const saveAccountAsync = (newAccountData) => (dispatch) =>
	request('/api/account', 'POST', newAccountData).then((res) => {
		if (res.data) {
			console.log(res.data);
			dispatch(addNewAccount(res.data));
		}
		return res;
	});
