import { getTransactions } from '../api';

export const fetchTransactions = async (userId, page, limit, parametrs) => {
	const transactions = await getTransactions(userId, page, limit, parametrs);

	return {
		error: null,
		res: {
			transactions,
		},
	};
};
