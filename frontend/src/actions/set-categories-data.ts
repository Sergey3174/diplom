import { ACTION_TYPE } from './action-type';

interface Category {
	id: string;
	userId: string;
	name: string;
	type: string;
	amount: number;
}

interface SetCategoriesDataAction {
	type: typeof ACTION_TYPE.SET_CATEGORIES_DATA;
	payload: Category[];
	[key: string]: any;
}

export const setCategoriesData = (
	categoriesData: Category[],
): SetCategoriesDataAction => ({
	type: ACTION_TYPE.SET_CATEGORIES_DATA,
	payload: categoriesData,
});
