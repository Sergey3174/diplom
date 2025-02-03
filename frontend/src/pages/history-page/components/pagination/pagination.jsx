import styled from 'styled-components';
import { Button } from '../../../../components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../../../selectors';

const PaginationContainer = ({ className, setPage, page, lastPage }) => {
	const { parametrs } = useSelector(selectFilter);
	useEffect(() => {
		setPage(1);
	}, [parametrs, setPage]);

	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page"> Страница {page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	width: 100%;
	margin: 10px 0;
	align-items: center;
	justify-content: center;
	margin-bottom: 120px;

	& button {
		margin: 0 5px;
		width: auto;
	}

	& .current-page {
		font-size: 18px;
		font-weight: 500;
		text-align: center;
	}
`;
