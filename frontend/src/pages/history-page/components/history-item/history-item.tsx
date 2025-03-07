import styled from 'styled-components';
import TRASH from '../../../../assets/trash.png';
import PENCIL from '../../../../assets/pencil.png';
import { useNavigate } from 'react-router-dom';
import { IconButton, StyleSpan } from '../../../../components';
import { CLOSE_MODAL, openModal, removeTransactionAsync } from '../../../../actions';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

interface HistoryItemProps {
	className?: string;
	transactionDate: string;
	amount: number;
	description: string;
	account: { name: string } | null;
	id: string;
	type: 'income' | 'expense';
	refreshFlag: () => void;
}

const HistoryItemContainer: React.FC<HistoryItemProps> = ({
	className,
	transactionDate,
	amount,
	description,
	account,
	id,
	type,
	refreshFlag,
}) => {
	const navigate = useNavigate();
	const dispatch: Dispatch = useDispatch();

	const deleteItem = () => {
		dispatch(
			openModal({
				text: 'Удалить операцию?',
				onConfirm: () => {
					dispatch(removeTransactionAsync(id)).then(() => refreshFlag());
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const accountName = account?.name ?? 'Не указано';

	return (
		<div className={className}>
			<div className="container">
				<div>{transactionDate}</div>
				<div>
					<StyleSpan type={type}>
						{type === 'income' ? amount : -amount}
					</StyleSpan>
				</div>
				<div>{description}</div>
				<div>{accountName}</div>
			</div>
			<IconButton
				icon={PENCIL}
				onClick={() => navigate(`/transaction/${id}`)}
				width="30px"
				margin="0 0 0 10px"
			/>
			<IconButton
				onClick={deleteItem}
				icon={TRASH}
				width="30px"
				margin="0 0 0 10px"
			/>
		</div>
	);
};

export const HistoryItem = styled(HistoryItemContainer)`
	display: flex;
	align-items: center;
	margin-top: 10px;

	& .container {
		display: flex;
		align-items: center;
		width: 100%;
		height: 33px;
		border-radius: 5px;
		padding: 10px;
		overflow: hidden;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		flex-wrap: wrap;

		& > div {
			flex: 1;
		}
	}
`;
