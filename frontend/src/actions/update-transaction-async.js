// import { addNewAccount } from './add-new-account';

import { request } from '../utils';
import { updateAccount } from './update-account';
import { updateCategory } from './update-category';

export const updateTransactionAsync = (idTransaction, newTransactionData) => (dispatch) =>
	request(`api/transaction/${idTransaction}`, 'PATCH', newTransactionData).then(
		(data) => {
			if (data) {
				console.log(data);
				if (data.newCategory) {
					data.newCategory.forEach((cat) => dispatch(updateCategory(cat)));
				}
				if (data.newAccount) {
					data.newAccount.forEach((acc) => dispatch(updateAccount(acc)));
				}
			}
			return data;
		},
	);
