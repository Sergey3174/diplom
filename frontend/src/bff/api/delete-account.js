export const deleteAccount = (id) => {
	return fetch(`http://localhost:3005/accounts/${id}`, {
		method: 'DELETE',
	});
};
