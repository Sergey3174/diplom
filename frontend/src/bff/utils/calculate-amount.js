export const calculateAmount = (arr, id, param) =>
	arr.reduce((acc, { amount, categoryId, accountId, type }) => {
		switch (param) {
			case 'category':
				return id == categoryId ? amount + acc : acc;
			case 'account':
				return id == accountId
					? type === 'income'
						? amount + acc
						: acc - amount
					: acc;
			default:
				return 0;
		}
	}, 0);
