export const updateCategory = ({ id, name, type }) =>
	fetch(`http://localhost:3005/categories/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name,
			type,
		}),
	});
