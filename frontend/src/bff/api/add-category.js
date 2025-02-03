export const addCategory = ({ userId, name, type }) =>
	fetch('http://localhost:3005/categories', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			userId,
			name,
			type,
		}),
	}).then((data) => data.json());
