import { ACTION_TYPE } from './action-type';

export const setTransactionsData = (transactionsData) => ({
	type: ACTION_TYPE.SET_TRANSACTIONS_DATA,
	payload: transactionsData,
});
