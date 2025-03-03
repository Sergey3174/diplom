import React from 'react';
import styled from 'styled-components';

interface ContentProps {
	className?: string;
	name?: string;
	children?: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ className, name = '', children }) => {
	return (
		<div className={className}>
			{name && <h5>{name}</h5>}
			{children ? children : 'Нет записей'}
		</div>
	);
};

export const ContentContainer = styled(Content)`
	display: flex;
	flex: 2;
	flex-direction: column;
	border: 1px solid #e0e0e0;
	border-radius: 10px;
	box-sizing: border-box;
	padding: 10px;
	background-color: #ffffff;

	& > h5 {
		margin: 0;
	}
`;
