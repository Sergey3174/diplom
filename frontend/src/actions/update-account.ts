import { ACTION_TYPE } from './action-type';

interface Account {
	amount: number;
	created_at: string;
	id: string;
	name: string;
	accountType: string;
	userId: string;

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
