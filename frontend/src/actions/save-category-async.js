import { request } from '../utils';
import { addNewCategory } from './add-new-category';

export const saveCategoryAsync = (newCategoryData) => (dispatch) =>
	request('/api/category', 'POST', newCategoryData).then((res) => {
		if (res.data) {
			console.log(res.data);
			dispatch(addNewCategory(res.data));
		}
		return res.data;
	});
