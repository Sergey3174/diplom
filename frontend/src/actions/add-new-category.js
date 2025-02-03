import { ACTION_TYPE } from './action-type';

export const addNewCategory = (newCategory) => ({
	type: ACTION_TYPE.ADD_NEW_CATEGORY,
	payload: newCategory,
});
