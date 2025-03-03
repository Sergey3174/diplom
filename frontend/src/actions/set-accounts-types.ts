import { ACTION_TYPE } from './action-type';

interface AccountType {
	id: string;
	name: string;
}

interface SetTypeAccountsAction {
	type: typeof ACTION_TYPE.SET_ACCOUNTS_TYPES;
	payload: AccountType[];
	[key: string]: any;
}

export const setTypeAccounts = (accountsTypes: AccountType[]): SetTypeAccountsAction => ({
	type: ACTION_TYPE.SET_ACCOUNTS_TYPES,
	payload: accountsTypes,
});
