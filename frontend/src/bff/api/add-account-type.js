export const addAccountType = (name) =>
	fetch('http://localhost:3005/type_accounts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name,
		}),
	}).then((createdType) => createdType.json());
