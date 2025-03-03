import styled from 'styled-components';
import ADD_ICON from '../../../../assets/add-icon.svg';
import { Link } from 'react-router-dom';
import { IconButton, Loader } from '../../../../components';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../../../selectors';

interface CardContainerProps {
	className?: string;
	children: React.ReactNode;
	to?: string;
	name: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
	className,
	children,
	to,
	name,
}) => {
	const isLoading = useSelector(selectIsLoading);
	return (
		<div className={className}>
			<div className="header_widget">
				<h3>{name}</h3>
				{to && (
					<Link to={to}>
						<IconButton icon={ADD_ICON} width="30px" />
					</Link>
				)}
			</div>
			{isLoading ? <Loader /> : children}
		</div>
	);
};

export const Card = styled(CardContainer)<{ flex?: string }>`
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	border: 1px solid #e0e0e0;
	padding: 5px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;
	background-color: #e9e9e9;
	flex: ${({ flex = '2 1 600px' }) => flex};

	&:hover {
		transform: translateY(-5px);
	}

	& .header_widget {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 0;
	}
`;
