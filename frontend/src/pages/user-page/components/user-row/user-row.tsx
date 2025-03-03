import styled from 'styled-components';
import PENCIL from '../../../../assets/pencil.png';
import { IconButton } from '../../../../components';

interface UserRowContainerProps {
	className?: string;
	children: React.ReactNode;
	handleIsChange: (name: string) => void;
	name: string;
}

interface UserRowProps {}

const UserRowContainer = ({
	className,
	children,
	handleIsChange,
	name,
}: UserRowContainerProps) => {
	return (
		<div className={className}>
			<span>{children}</span>
			<IconButton
				icon={PENCIL}
				onClick={() => handleIsChange(name)}
				width="30px"
				margin="0 0 0 10px"
			/>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	font-size: 25px;
	margin: 0 0 10px 0;
	justify-content: space-between;
	width: 100%;
	align-items: center;

	@media (max-width: 768px) {
		font-size: 18px;
	}
`;
