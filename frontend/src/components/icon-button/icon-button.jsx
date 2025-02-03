import styled from 'styled-components';

const IconButtonContainer = ({ className, icon, ...props }) => {
	return <img className={className} src={icon} {...props} />;
};

export const IconButton = styled(IconButtonContainer)`
	width: ${({ width = '100%' }) => width};
	cursor: pointer;
	margin: ${({ margin = '0 0' }) => margin};
	position: ${({ position = 'static' }) => position};
	right: ${({ right = '100' }) => right};
	top: ${({ top = '' }) => top};
`;
