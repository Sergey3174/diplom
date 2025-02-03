import { deleteCategory } from '../api';

export const removeCategory = async (id) => {
	await deleteCategory(id);
	return {
		error: null,
		res: true,
	};
};
