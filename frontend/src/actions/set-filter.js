import { ACTION_TYPE } from './action-type';

export const setFilter = (paramsFilter) => ({
	type: ACTION_TYPE.SET_FILTER,
	payload: paramsFilter,
});
