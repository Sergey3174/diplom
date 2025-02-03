export const getAccounts = (userId) =>
	fetch(`http://localhost:3005/accounts?userId=${userId}`)
		.then((data) => data.json())
		.then((data) => {
			return {
				accounts: data,
			};
		});
