import { request } from '../utils';
import { addTypeAccount } from './add-type-account';

export const addTypeAccountAsync = (name) => (dispatch) => {
	return request('/api/account/type_account', 'POST', { name }).then((res) => {
		console.log(res);
		dispatch(addTypeAccount(res.data));
	});
};
