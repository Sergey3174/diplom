import styled from 'styled-components';
import UserAvatar from '../../../../assets/user-svgrepo-com.svg';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin } from '../../../../selectors';
import { logout } from '../../../../actions';
import { Button } from '../../../button/button';
import { useNavigate } from 'react-router-dom';

interface UserBlockContainerProps {
	className?: string;
}

const UserBlockContainer = ({ className }: UserBlockContainerProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const onUserPage = () => {
		navigate('user-page');
	};

	return (
		<div className={className}>
			<img src={UserAvatar} alt="User Avatar" />
			<span>{login}</span>
			<Button onClick={onUserPage} margin="0 0 5px 0">
				Редактировать
			</Button>
			<Button onClick={onLogout}>Выход</Button>
		</div>
	);
};

export const UserBlock = styled(UserBlockContainer)<UserBlockContainerProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 8px;
	width: 150px;
	position: absolute;
	bottom: 10vh;
	left: 50%;
	transform: translateX(-50%);

	& > img {
		width: 65%;
		border-radius: 50%;
	}

	@media (max-width: 1000px) {
		position: static;
		transform: none;
		display: flex;
		width: auto;
		flex-direction: row;

		& > img {
			width: 40px;
			border-radius: 50%;
		}

		& > button {
			margin: 0 5px;
			font-size: 0.5rem;
			width: auto;
		}
	}
`;
