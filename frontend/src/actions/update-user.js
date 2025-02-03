import { ACTION_TYPE } from './action-type';

export const updateUser = (newDataUser) => ({
	type: ACTION_TYPE.UPDATE_USER,
	payload: newDataUser,
});
