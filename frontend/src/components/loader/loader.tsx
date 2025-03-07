import styled from 'styled-components';

interface LoaderContainerProps {
	className?: string;
}

const LoaderContainer = ({ className }: LoaderContainerProps) => {
	return <span className={className}></span>;
};

export const Loader = styled(LoaderContainer)`
	margin: 0 auto;
	width: 48px;
	height: 48px;
	border: 5px solid #fff;
	border-bottom-color: #535bf2;
	border-radius: 50%;
	display: block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
