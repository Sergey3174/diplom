import styled from 'styled-components';
import logo from '../../../../assets/logo.png';
const LogoContainer = ({ className }) => {
	return (
		<div className={className}>
			<img src={logo} />
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
`;
