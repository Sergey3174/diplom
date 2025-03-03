import styled from 'styled-components';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputContainerProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	width?: string;
	margin?: string;
}

const InputContainer = forwardRef<HTMLInputElement, InputContainerProps>(
	({ className, ...props }, ref) => {
		return <input className={className} {...props} ref={ref} />;
	},
);

InputContainer.displayName = 'InputContainer';

export const Input = styled(InputContainer)<InputContainerProps>`
	width: ${({ width = '100%' }) => width};
	box-sizing: border-box;
	height: 40px;
	margin: ${({ margin = '0 0 10px' }) => margin};
	padding: 10px;
	border: 1px solid #000;
	font-size: 18px;
`;
