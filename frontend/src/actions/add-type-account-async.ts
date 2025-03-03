import { request } from '../utils';
import { addTypeAccount } from './add-type-account';
import { Dispatch } from 'redux';
import { ACTION_TYPE } from './action-type';

interface NewAccountData {
	id: string;
	name: string;
}

interface TypeResponse {
	data: NewAccountData;
}

export const addTypeAccountAsync = (name: string): any => {
	return (dispatch: Dispatch) =>
		request('/api/account/type_account', 'POST', { name })
			.then((res: TypeResponse) => {
				console.log(res);
				dispatch(addTypeAccount(res.data));
			})
			.catch((error) => {
				console.error('Ошибка при добавлении типа счета:', error);
			});
};
