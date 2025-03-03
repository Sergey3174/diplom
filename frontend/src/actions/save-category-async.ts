import { request } from '../utils';
import { addNewCategory } from './add-new-category';
import { Dispatch } from 'redux';

interface newCategory {
	userId: string;
	name: string;
	type: string;
}
interface Category {
	id: string;
	userId: string;
	name: string;
	type: string;
	amount: number;
}

interface CategoryResponse {
	data?: Category;
}

export const saveCategoryAsync = (newCategoryData: newCategory) => (dispatch: Dispatch) =>
	request('/api/category', 'POST', newCategoryData).then((res: CategoryResponse) => {
		if (res.data) {
			dispatch(addNewCategory(res.data));
		}
		return res.data;
	});
