import { ACTION_TYPE } from './action-type';

export const addNewAccount = (newAccount) => ({
	type: ACTION_TYPE.ADD_NEW_ACCOUNT,
	payload: newAccount,
});
