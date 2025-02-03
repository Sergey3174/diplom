import { ACTION_TYPE } from './action-type';

export const addTypeAccount = (newType) => ({
	type: ACTION_TYPE.ADD_ACCOUNT_TYPE,
	payload: newType,
});
