import { ACTION_TYPE } from './action-type';

export const removeTransaction = (id) => ({
	type: ACTION_TYPE.REMOVE_TRANSACTION,
	payload: id,
});
