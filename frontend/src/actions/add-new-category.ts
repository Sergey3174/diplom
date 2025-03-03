import { ACTION_TYPE } from './action-type';

interface Category {
	id: string;
	userId: string;
	name: string;
	type: string;
	amount: number;
}

interface AddNewCategory {
	type: typeof ACTION_TYPE.ADD_NEW_ACCOUNT;
	payload: Category;
	[key: string]: any;
}

export const addNewCategory = (newCategory: Category): AddNewCategory => ({
	type: ACTION_TYPE.ADD_NEW_CATEGORY,
	payload: newCategory,
});
