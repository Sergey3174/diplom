export const deleteTransaction = (id) => {
	return fetch(`http://localhost:3005/transactions/${id}`, {
		method: 'DELETE',
	});
};
