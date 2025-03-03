import { ACTION_TYPE } from './action-type';

interface User {
	name: string;
	email: string;
	login: string;
}

interface UpdateUserAction {
	type: typeof ACTION_TYPE.UPDATE_USER;
	payload: User;
	[key: string]: any;
}

export const updateUser = (newDataUser: User): UpdateUserAction => ({
	type: ACTION_TYPE.UPDATE_USER,
	payload: newDataUser,
});
