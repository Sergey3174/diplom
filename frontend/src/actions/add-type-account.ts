import { ACTION_TYPE } from './action-type';

interface NewAccountData {
	id: string;
	name: string;
}

interface AddTypeAccountAction {
	type: typeof ACTION_TYPE.ADD_ACCOUNT_TYPE;
	payload: NewAccountData;
	[key: string]: any;
}

export const addTypeAccount = (newType: NewAccountData): AddTypeAccountAction => ({
	type: ACTION_TYPE.ADD_ACCOUNT_TYPE,
	payload: newType,
});
