export const updateUser = (newUserData) => {
	console.log(newUserData);
	return fetch(`http://localhost:3005/users/${newUserData.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name: newUserData.name,
			email: newUserData.email,
		}),
	});
};
