// import { addNewAccount } from './add-new-account';

import { request } from '../utils';
import { updateAccount } from './update-account';
import { updateCategory } from './update-category';

export const saveTransactionAsync = (newTransactionData) => (dispatch) =>
	request('/api/transaction/', 'POST', newTransactionData).then((res) => {
		if (res) {
			dispatch(updateCategory(res.category));
			dispatch(updateAccount(res.account));
		}
		return res;
	});
