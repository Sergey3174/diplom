import { ACTION_TYPE } from './action-type';

export const updateCategory = (newCategory) => ({
	type: ACTION_TYPE.UPDATE_CATEGORY,
	payload: newCategory,
});
