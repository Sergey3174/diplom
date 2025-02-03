import { ACTION_TYPE } from './action-type';

export const updateAccount = (newAccount) => ({
	type: ACTION_TYPE.UPDATE_ACCOUNT,
	payload: newAccount,
});
