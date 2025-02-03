export const getAccountsTypes = () =>
	fetch(`http://localhost:3005/type_accounts`)
		.then((data) => data.json())
		.then((data) => {
			return {
				typeAccounts: data,
			};
		});
