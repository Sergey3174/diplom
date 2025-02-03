import { useEffect, useState } from 'react';
import { useServerRequest } from './use-server-request';
import { useSelector } from 'react-redux';
import { selectUserId } from '../selectors';

export const useRequestTransactions = (type = '') => {
	const [transactions, setTransactions] = useState([]);
	const serverRequest = useServerRequest();
	const userId = useSelector(selectUserId);

	useEffect(() => {
		serverRequest('fetchTransactions', userId, 1, 3, { type }).then(({ res }) => {
			const { transactions } = res.transactions;
			setTransactions(transactions);
		});
	}, [serverRequest, userId, type]);

	return transactions;
};
