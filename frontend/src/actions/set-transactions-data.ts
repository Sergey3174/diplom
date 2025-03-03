import { ACTION_TYPE } from './action-type';

interface Transaction {
	id: string;
	userId: string;
	accountId: string;
	categoryId: string;
	type: string;
	description: string;
	amount: number;
	createdAt: string;
}

interface SetTransactionsDataAction {
	type: typeof ACTION_TYPE.SET_TRANSACTIONS_DATA;
	payload: Transaction[]; // Массив с объектами типа Transaction
}

export const setTransactionsData = (
	transactionsData: Transaction[],
): SetTransactionsDataAction => ({
	type: ACTION_TYPE.SET_TRANSACTIONS_DATA,
	payload: transactionsData,
});
