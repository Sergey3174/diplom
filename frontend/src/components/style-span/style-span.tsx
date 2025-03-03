import styled from 'styled-components';

interface StyleSpanContainerProps {
	className?: string;
	children: React.ReactNode;
	type: 'income' | 'expense';
}

const StyleSpanContainer = ({ className, children, type }: StyleSpanContainerProps) => {
	return (
		<span className={className}>
			{type === 'income' ? '↑  ' : '↓  '}
			{children}
		</span>
	);
};

export const StyleSpan = styled(StyleSpanContainer)<StyleSpanContainerProps>`
	text-align: right;
	min-width: 60px;
	padding: 2px 6px;
	border-radius: 3px;
	background-color: ${({ type }) =>
		type === 'income' ? 'rgba(144, 238, 144, 0.8)' : 'rgba(252,40,71, 0.8)'};
	border: 2px solid ${({ type }) => (type === 'income' ? '#B7D286 ' : '#FC2847')};
`;
