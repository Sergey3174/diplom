import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	selectAccounts,
	selectFilter,
	selectIsLoading,
	selectUserId,
} from '../../selectors';
import { HistoryItem, Pagination, ControlPanel } from './components';
import { useEffect, useState } from 'react';
import { ACTION_TYPE } from '../../actions';
import { Loader } from '../../components';
import { request } from '../../utils';

interface Transaction {
	transactionDate: string;
	amount: number;
	description: string;
	accountId: string;
	id: string;
	type: 'income' | 'expense';
}

interface FilterParameters {
	type?: string;
	account?: string;
	category?: string;
}

interface HistoryPageProps {
	className?: string;
}

interface Account {
	amount: number;
	created_at: string;
	id: string;
	name: string;
	accountType: string;
	userId: string;
}

const HistoryPageContainer = ({ className }: HistoryPageProps) => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [refresh, setRefresh] = useState(false);
	const [page, setPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);

	const limit = 10;
	const refreshFlag = () => setRefresh((prev) => !prev);

	const { accounts } = useSelector(selectAccounts);
	const { parametrs }: { parametrs: FilterParameters } = useSelector(selectFilter);
	const isLoading = useSelector(selectIsLoading);
	const userId = useSelector(selectUserId);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: ACTION_TYPE.SET_LOADING });
		request(
			`/api/transaction?userId=${userId}&page=${page}&limit=${limit}${
				parametrs.type ? `&type=${parametrs.type}` : ''
			}${parametrs.account ? `&accountId=${parametrs.account}` : ''}${
				parametrs.category ? `&categoryId=${parametrs.category}` : ''
			}`,
		)
			.then(({ data }) => {
				const { transactions, lastPage } = data;
				if (page > 1 && !transactions.length) {
					setPage(page - 1);
					return;
				}
				setLastPage(lastPage);
				setTransactions(transactions);
			})
			.finally(() => dispatch({ type: ACTION_TYPE.SET_LOADING }));
	}, [userId, page, refresh, parametrs, dispatch]);

	return (
		<div className={className}>
			<div className="container-history-item">
				<div className="histoty-header">
					<h3>История</h3>
					<ControlPanel />
				</div>
				{isLoading && <Loader />}
				{transactions.length ? (
					transactions.map(
						({
							transactionDate,
							amount,
							description,
							accountId,
							id,
							type,
						}) => (
							<HistoryItem
								key={id}
								amount={amount}
								transactionDate={transactionDate}
								description={description}
								account={accounts.find(
									({ id: accId }: Account) => accId === accountId,
								)}
								type={type}
								id={id}
								refreshFlag={refreshFlag}
							/>
						),
					)
				) : (
					<span>Нет транзакций</span>
				)}
			</div>
			{lastPage > 1 && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
			)}
		</div>
	);
};

export const HistoryPage = styled(HistoryPageContainer)`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
	border-radius: 5px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

	& .histoty-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& > h3 {
		margin: 10px;
	}

	& .container-history-item {
		flex-grow: 1;
		width: 70%;
		margin: 20px auto;
		border-radius: 5px;
	}

	@media (max-width: 1000px) {
		font-size: 0.6rem;
		& .container-history-item {
			width: 100%;
			margin: 20px auto;
		}
	}
`;
