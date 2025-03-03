import { ACTION_TYPE } from './action-type';

interface User {
	id: string;
	name: string;
	email: string;
	login: string;
	registeredAt: string;
	roleId: number;
}

interface SetUserAction {
	type: typeof ACTION_TYPE.SET_USER;
	payload: User;
	[key: string]: any; // Объект типа User
}

export const setUser = (user: User): SetUserAction => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});
