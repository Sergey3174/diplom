export const addTransaction = ({
	userId,
	accountId,
	categoryId,
	amount,
	type,
	description,
	transaction_date,
}) =>
	fetch('http://localhost:3005/transactions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			userId,
			accountId,
			categoryId,
			amount,
			type,
			description,
			transaction_date,
		}),
	}).then((data) => data.json());
