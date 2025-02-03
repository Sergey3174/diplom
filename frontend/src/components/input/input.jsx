import styled from 'styled-components';
import { forwardRef } from 'react';

const InputContainer = forwardRef(({ className, ...props }, ref) => {
	return <input className={className} {...props} ref={ref}></input>;
});

InputContainer.displayName = 'InputContainer';

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	box-sizing: border-box;
	height: 40px;
	margin: ${({ margin = '0 0 10px' }) => margin};
	padding: 10px;
	border: 1px solid #000;
	font-size: 18px;
`;
