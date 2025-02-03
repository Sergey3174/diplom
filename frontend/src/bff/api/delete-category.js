export const deleteCategory = (id) => {
	return fetch(`http://localhost:3005/categories/${id}`, {
		method: 'DELETE',
	});
};
