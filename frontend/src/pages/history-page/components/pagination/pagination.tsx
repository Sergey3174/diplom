import styled from 'styled-components';
import { Button } from '../../../../components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../../../selectors';

interface PaginationContainerProps {
	className?: string;
	setPage: (page: number) => void;
	page: number;
	lastPage: number;
}

const PaginationContainer: React.FC<PaginationContainerProps> = ({
	className,
	setPage,
	page,
	lastPage,
}) => {
	const { parametrs } = useSelector(selectFilter);

	useEffect(() => {
		setPage(1);
	}, [parametrs, setPage]);

	const lastPageCheck = lastPage > 0 ? lastPage : 1;

	return (
		<div className={className}>
			<Button
				disabled={page === 1}
				onClick={() => setPage(1)}
				aria-disabled={page === 1 ? 'true' : 'false'}
			>
				В начало
			</Button>
			<Button
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
				aria-disabled={page === 1 ? 'true' : 'false'}
			>
				Предыдущая
			</Button>
			<div className="current-page">Страница {page}</div>
			<Button
				disabled={page === lastPageCheck}
				onClick={() => setPage(page + 1)}
				aria-disabled={page === lastPageCheck ? 'true' : 'false'}
			>
				Следующая
			</Button>
			<Button
				disabled={page === lastPageCheck}
				onClick={() => setPage(lastPageCheck)}
				aria-disabled={page === lastPageCheck ? 'true' : 'false'}
			>
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
