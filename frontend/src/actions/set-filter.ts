import { ACTION_TYPE } from './action-type';

interface FilterParams {
	[key: string]: any; // Можно уточнить тип, если параметры фильтра известны
}

interface SetFilterAction {
	type: typeof ACTION_TYPE.SET_FILTER;
	payload: FilterParams;
	[key: string]: any; // Объект с параметрами фильтра
}

export const setFilter = (paramsFilter: FilterParams): SetFilterAction => ({
	type: ACTION_TYPE.SET_FILTER,
	payload: paramsFilter,
});
