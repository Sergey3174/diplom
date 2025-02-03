import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);
	if (!user) {
		return {
			error: 'Такой пользователь не найден',
			res: null,
		};
	}

	const { id, login, password, name, email } = user;

	if (authPassword !== password) {
		return {
			error: 'Неверный пароль',
			res: null,
		};
	}

	return {
		error: null,
		res: {
			id,
			login,
			name,
			email,
			session: sessions.create(user),
		},
	};
};
