import { ACTION_TYPE } from './action-type';

export const setTypeAccounts = (accountsTypes) => ({
	type: ACTION_TYPE.SET_ACCOUNTS_TYPES,
	payload: accountsTypes,
});
