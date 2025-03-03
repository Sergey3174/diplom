import styled from 'styled-components';

interface IconButtonContainerProps {
	className?: string;
	icon: string;
	width?: string;
	margin?: string;
	position?: string;
	right?: string;
	top?: string;
	onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const IconButtonContainer = ({ className, icon, ...props }: IconButtonContainerProps) => {
	return <img className={className} src={icon} alt="icon" {...props} />;
};

export const IconButton = styled(IconButtonContainer)<IconButtonContainerProps>`
	width: ${({ width = '100%' }) => width};
	cursor: pointer;
	margin: ${({ margin = '0 0' }) => margin};
	position: ${({ position = 'static' }) => position};
	right: ${({ right = '100' }) => right};
	top: ${({ top = '' }) => top};
`;
