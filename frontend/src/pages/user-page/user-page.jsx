import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser } from '../../selectors';
import BACK_ICON from '../../assets/back.png';
import TRASH from '../../assets/trash.png';
import USER_ICON from '../../assets/user-svgrepo-com.svg';
import { UserRow } from './components';
import { InputForm } from '../../components/input-form/input-form';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AuthFormError, Button, IconButton } from '../../components';
import { CLOSE_MODAL, logout, openModal, updateUser } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { request } from '../../utils';

const authFormSchema = yup.object().shape({
	name: yup.string().required('Заполните ФИО'),
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	email: yup.string().required('Заполните email').email(),
});

const PasswordSchema = yup.object().shape({
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

const UserPageContainer = ({ className }) => {
	const user = useSelector(selectUser);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			login: user.login,
			name: user.name,
			email: user.email,
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});
	const [serverError, setServerError] = useState(null);
	const [isChange, setIsChange] = useState({
		name: false,
		login: false,
		email: false,
		password: false,
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleIsChange = (name) => {
		setIsChange((prevValues) => ({
			...prevValues,
			[name]: !prevValues[name],
		}));
	};

	const formError =
		errors?.login?.message ||
		errors?.email?.message ||
		errors?.name?.message ||
		errors?.password?.message;

	const errorMessage = formError || serverError;

	const onSubmit = async ({ login, name, email, password }) => {
		if (login === user.login && isChange.login) {
			setServerError('Введите новый логин');
			return;
		}
		if (isChange.password) {
			try {
				await PasswordSchema.validate({ password });
			} catch (error) {
				setServerError(error.message);
				return;
			}
		}

		request(`/api/users/${user.id}`, 'PATCH', {
			login: isChange.login ? login : '',
			password,
			name,
			email,
		}).then(({ error }) => {
			if (error) {
				setServerError(error);
				return;
			}
			dispatch(updateUser({ login, name, email }));
			const user = JSON.parse(sessionStorage.getItem('userData'));
			const newUser = {
				...user,
				login: login ? login : user.login,
				name: name ? name : user.name,
				email: email ? email : user.email,
			};

			sessionStorage.setItem('userData', JSON.stringify(newUser));

			setIsChange({
				name: false,
				login: false,
				email: false,
				password: false,
			});
		});
	};

	const deleteUser = () => {
		dispatch(
			openModal({
				text: 'Удалить аккаунт?',
				onConfirm: () => {
					request(`/api/users/${user.id}`, 'DELETE').then(() => {
						dispatch(CLOSE_MODAL);
						dispatch(logout());
						sessionStorage.removeItem('userData');
					});
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="container">
				<IconButton
					icon={BACK_ICON}
					width="30px"
					position="absolute"
					right="100%"
					top="0"
					onClick={() => navigate(-1)}
				/>
				<IconButton
					icon={TRASH}
					width="30px"
					position="absolute"
					margin="0px 0 0 0px"
					right="-30px"
					top="0"
					onClick={deleteUser}
				/>
				<img src={USER_ICON} />
				<form onSubmit={handleSubmit(onSubmit)}>
					<span className="title">ФИО:</span>
					{!isChange.name ? (
						<UserRow name="name" handleIsChange={handleIsChange}>
							{user.name}
						</UserRow>
					) : (
						<InputForm
							name="name"
							handleIsChange={handleIsChange}
							register={{
								...register('name', {
									onChange: () => setServerError(null),
								}),
							}}
							setValue={(name) => setValue(name, user.name)}
						/>
					)}
					<span className="title">Логин:</span>
					{!isChange.login ? (
						<UserRow name="login" handleIsChange={handleIsChange}>
							{user.login}
						</UserRow>
					) : (
						<InputForm
							name="login"
							handleIsChange={handleIsChange}
							register={{
								...register('login', {
									onChange: () => setServerError(null),
								}),
							}}
							setValue={(name) => setValue(name, user.login)}
						/>
					)}
					<span className="title">E-mail:</span>
					{!isChange.email ? (
						<UserRow name="email" handleIsChange={handleIsChange}>
							{user.email}
						</UserRow>
					) : (
						<InputForm
							name="email"
							handleIsChange={handleIsChange}
							register={{
								...register('email', {
									onChange: () => setServerError(null),
								}),
							}}
							setValue={(name) => setValue(name, user.email)}
						/>
					)}

					{!isChange.password ? (
						<Button
							margin="10px 0 0 0 "
							onClick={() => handleIsChange('password')}
						>
							Изменить пароль
						</Button>
					) : (
						<InputForm
							name="password"
							handleIsChange={handleIsChange}
							register={{
								...register('password', {
									onChange: () => setServerError(null),
								}),
							}}
							setValue={(name) => setValue(name, '')}
						/>
					)}

					{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

					<Button
						margin="10px 0 0 0 "
						type="submit"
						disabled={
							!!errorMessage ||
							Object.values(isChange).every((value) => value === false)
						}
					>
						Сохранить
					</Button>
				</form>
			</div>
		</div>
	);
};

export const UserPage = styled(UserPageContainer)`
	width: 70%;
	min-height: 70vh;
	margin: 100px auto;
	display: flex;
	border: 1px solid #e0e0e0;
	justify-content: center;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	align-items: center;

	& .container {
		position: relative;
		height: 100%;
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
		justify-content: center;
	}

	& .title {
		font-size: 20px;
		font-weight: bold;
	}
`;
