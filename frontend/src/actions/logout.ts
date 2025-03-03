import { ACTION_TYPE } from './action-type';
import { request } from '../utils';

interface LogoutAction {
	type: typeof ACTION_TYPE.LOGOUT;
	[key: string]: any;
}

export const logout = (): LogoutAction => {
	request('/api/logout', 'POST');
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
