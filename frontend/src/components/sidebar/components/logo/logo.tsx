import styled from 'styled-components';
import logo from '../../../../assets/logo.png';

interface LogoContainerProps {
	className?: string;
}

const LogoContainer = ({ className }: LogoContainerProps) => {
	return (
		<div className={className}>
			<img src={logo} alt="Logo" />
			<h2>Кошелек</h2>
		</div>
	);
};

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
	color: #2686df;

	& img {
		margin: 10px;
		width: 50px;
		height: 50px;
	}

	@media (max-width: 1000px) {
		font-size: 0.6rem;

		& img {
			margin: 10px;
			width: 25px;
			height: 25px;
		}
	}
`;
