import styled from 'styled-components';

interface ButtonContainerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: React.ReactNode;
	disabled?: boolean;
	margin?: string;
	width?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonContainer = ({
	className,
	children,
	onClick,
	...props
}: ButtonContainerProps) => {
	return (
		<button className={className} onClick={onClick} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)<ButtonContainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${({ margin = '0 auto' }) => margin};
	width: ${({ width = '100%' }) => width};
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.6em 1.2em;
	font-size: 1em;
	font-weight: 500;
	font-family: inherit;
	background-color: #5696fa;
	cursor: pointer;
	transition: border-color 0.25s;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		border-color: blue;
	}

	&:focus,
	&:focus-visible {
		outline: 4px auto -webkit-focus-ring-color;
	}
`;
