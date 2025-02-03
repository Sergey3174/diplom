export const updateAccount = ({ id, name, typeAccount }) =>
	fetch(`http://localhost:3005/accounts/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name,
			type_accounts: typeAccount,
		}),
	});
