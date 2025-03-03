import { ACTION_TYPE } from './action-type';

interface Account {
	id: string;
	userId: string;
	name: string;
	amount: number;
	type_accounts: string;
	created_at: string;
}

interface AddNewAccountAction {
	type: typeof ACTION_TYPE.ADD_NEW_ACCOUNT;
	payload: Account;
	[key: string]: any;
}

export const addNewAccount = (newAccount: Account): AddNewAccountAction => ({
	type: ACTION_TYPE.ADD_NEW_ACCOUNT,
	payload: newAccount,
});
