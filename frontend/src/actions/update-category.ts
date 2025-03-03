import { ACTION_TYPE } from './action-type';


interface Category {
	amount: number;
	id: string;
	name: string;
	type: string;
	userId: string;
  }

interface UpdateCategoryAction {
	type: typeof ACTION_TYPE.UPDATE_CATEGORY;
	payload: Category;
	[key: string]: any;
}


export const updateCategory = (newCategory: Category): UpdateCategoryAction => ({
	type: ACTION_TYPE.UPDATE_CATEGORY,
	payload: newCategory,
});
