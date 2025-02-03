import styled from 'styled-components';

const StyleSpanContainer = ({ className, children, type }) => {
	return (
		<span className={className}>
			{type === 'income' ? '↑  ' : '↓  '}
			{children}
		</span>
	);
};

export const StyleSpan = styled(StyleSpanContainer)`
	text-align: right;
	min-width: 60px;
	padding: 2px 6px;
	border-radius: 3px;
	background-color: ${({ type }) =>
		type === 'income' ? 'rgba(144, 238, 144, 0.8)' : 'rgba(252,40,71, 0.8)'};
	border: 2px solid ${({ type }) => (type === 'income' ? '#B7D286 ' : '#FC2847')};
`;
