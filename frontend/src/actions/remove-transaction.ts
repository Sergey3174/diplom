import { ACTION_TYPE } from './action-type';

interface RemoveTransactionAction {
	type: typeof ACTION_TYPE.REMOVE_TRANSACTION;
	payload: string;
}

export const removeTransaction = (id: string): RemoveTransactionAction => ({
	type: ACTION_TYPE.REMOVE_TRANSACTION,
	payload: id,
});
