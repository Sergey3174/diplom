import { request } from '../utils';
import { updateAccount } from './update-account';
import { updateCategory } from './update-category';

export const removeTransactionAsync = (id) => (dispatch) => {
	return request(`/api/transaction/${id}`, 'DELETE').then((res) => {
		dispatch(updateCategory(res.data.category));
		dispatch(updateAccount(res.data.account));
	});
};
