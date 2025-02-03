import { transformTransactions } from '../transformers';
export const getTransactions = (userId, page, limit, parametrs = {}, sort = 'desc') => {
	return fetch(
		`http://localhost:3005/transactions?userId=${userId}${
			parametrs.type ? `&type=${parametrs.type}` : ''
		}${parametrs.account ? `&accountId=${parametrs.account}` : ''}${
			parametrs.category ? `&categoryId=${parametrs.category}` : ''
		}${page ? `&_page=${page}` : ''}${
			limit ? `&_limit=${limit}` : ''
		}&_sort=transaction_date&_order=${sort}`,
	)
		.then(async (data) => {
			const totalCount = data.headers.get('X-Total-Count');

			const lastPage = Math.ceil(parseInt(totalCount) / limit);
			return { data: await data.json(), lastPage };
		})
		.then(({ data, lastPage }) => {
			return {
				transactions: data && data.map(transformTransactions),
				lastPage,
			};
		});
};
