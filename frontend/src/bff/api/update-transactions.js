export const updateTransaction = ({
	id,
	accountId,
	categoryId,
	amount,
	type,
	description,
}) => {
	return fetch(`http://localhost:3005/transactions/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			accountId,
			categoryId,
			amount,
			type,
			description,
		}),
	});
};
