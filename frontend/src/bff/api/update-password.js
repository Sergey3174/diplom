export const updatePassword = (id, password) => {
	return fetch(`http://localhost:3005/users/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			password,
		}),
	});
};
