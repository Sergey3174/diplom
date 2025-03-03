import { ACTION_TYPE } from './action-type';

interface Account {
	id: string;
	userId: string;
	name: string;
	amount: number;
	type_accounts: string;
	created_at: string;
}
interface SetAccountsDataAction {
	type: typeof ACTION_TYPE.SET_ACCOUNTS_DATA;
	payload: Account[];
	[key: string]: any; // Массив с объектами типа Account
}

export const setAccountsData = (accountsData: Account[]): SetAccountsDataAction => ({
	type: ACTION_TYPE.SET_ACCOUNTS_DATA,
	payload: accountsData,
});
