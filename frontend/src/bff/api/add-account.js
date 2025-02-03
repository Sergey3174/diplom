export const addAccount = ({ userId, name, typeAccount }) =>
	fetch('http://localhost:3005/accounts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			userId,
			name,
			type_accounts: typeAccount,
			created_at: new Date(),
		}),
	}).then((data) => data.json());
