import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
	modal: {
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
		isOpen: false,
	},
	filter: {
		isFilter: false,
		parametrs: {
			type: '',
			account: '',
			category: '',
		},
	},
	isLoading: false,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: { ...state.modal, ...action.payload, isOpen: true },
			};
		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;
		case ACTION_TYPE.SET_FILTER:
			return {
				...state,
				filter: {
					...state.filter,
					isFilter: true,
					parametrs: {
						...state.filter.parametrs,
						[action.payload.name]: action.payload.value,
					},
				},
			};
		case ACTION_TYPE.RESET_FILTER:
			return {
				...state,
				filter: initialAppState.filter,
			};
		case ACTION_TYPE.SET_LOADING:
			return {
				...state,
				isLoading: !state.isLoading,
			};
		default:
			return state;
	}
};
