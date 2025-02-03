import { ACTION_TYPE } from '../actions';

export const initialTransactionsState = {
	transactions: [],
};

export const transactionsReducer = (state = initialTransactionsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_TRANSACTIONS_DATA:
			return {
				...action.payload,
			};
		case ACTION_TYPE.REMOVE_TRANSACTION:
			return {
				...state,
				transactions: state.transactions.filter(
					({ id }) => id !== action.payload,
				),
			};
		default:
			return state;
	}
};
