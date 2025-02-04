import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { StyleSpan } from '../../../../../../components';

const ItemCardContainer = ({ className, to, name, id, amount, date, type }) => {
	const navigate = useNavigate();

	return (
		<div
			className={className}
			key={id}
			onClick={to ? () => navigate(`${to}/${id}`) : undefined}
		>
			{date && <span>{date}</span>}
			<span>{name}</span>
			<StyleSpan type={type}>{amount}</StyleSpan>
		</div>
	);
};

export const ItemCard = styled(ItemCardContainer)`
	display: flex;
	margin-bottom: 5px;
	justify-content: space-between;
	align-items: center;
	padding: 5px;
	overflow: hidden;
	box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);
	font-size: 20px;
	cursor: pointer;

	&:hover {
		transform: scale(0.99); /* Легкое увеличение при наведении */
		transition: color 0.2s ease, transform 0.2s ease;
	}

	@media (max-width: 1000px) {
		font-size: 0.6rem;
	}
`;
