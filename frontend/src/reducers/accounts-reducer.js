import { ACTION_TYPE } from '../actions';

export const initialAccountsState = {
	accounts: [],
	typeAccounts: [],
};

export const accountsReducer = (state = initialAccountsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ACCOUNTS_DATA:
			return {
				...state,
				accounts: action.payload,
			};
		case ACTION_TYPE.SET_ACCOUNTS_TYPES:
			return {
				...state,
				typeAccounts: action.payload,
			};
		case ACTION_TYPE.ADD_ACCOUNT_TYPE:
			return {
				...state,
				typeAccounts: [...state.typeAccounts, action.payload],
			};
		case ACTION_TYPE.ADD_NEW_ACCOUNT:
			return {
				...state,
				accounts: [...state.accounts, action.payload],
			};
		case ACTION_TYPE.UPDATE_ACCOUNT:
			return {
				...state,
				accounts: state.accounts.map((account) =>
					account.id === action.payload.id ? action.payload : account,
				),
			};
		default:
			return state;
	}
};
