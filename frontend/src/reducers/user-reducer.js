import { ACTION_TYPE } from '../actions';

const initialUserState = {
	id: null,
	login: null,
	name: null,
	email: null,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}
		case ACTION_TYPE.LOGOUT: {
			return initialUserState;
		}
		case ACTION_TYPE.UPDATE_USER: {
			return {
				...state,
				login: action.payload.login ? action.payload.login : state.login,
				name: action.payload.name ? action.payload.name : state.name,
				email: action.payload.email ? action.payload.email : state.email,
			};
		}
		default:
			return state;
	}
};
