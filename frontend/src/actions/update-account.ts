import { ACTION_TYPE } from './action-type';

interface Account {
	id: string;
	userId: string;
	name: string;
	amount: number;
	type_accounts: string;
	created_at: string;
}

interface UpdateAccountAction {
	type: typeof ACTION_TYPE.UPDATE_ACCOUNT;
	payload: Account;
	[key: string]: any;
}

export const updateAccount = (newAccount: Account): UpdateAccountAction => ({
	type: ACTION_TYPE.UPDATE_ACCOUNT,
	payload: newAccount,
});
