import { getUser, updateLogin, updatePassword, updateUser } from '../api';
import { sessions } from '../sessions';

export const saveUser = async (dataUser) => {
	console.log(dataUser);
	const user = await getUser(dataUser.login);

	if (user) {
		console.log('tut');
		return {
			error: 'Такой логин занят',
			res: null,
		};
	}

	if (dataUser.password) {
		await updatePassword(dataUser.id, dataUser.password);
	}

	if (dataUser.login) {
		await updateLogin(dataUser.id, dataUser.login);
	}

	await updateUser(dataUser);

	return {
		error: null,
		res: true,
	};
	// const { id, login, password, name, email } = user;

	// if (authPassword !== password) {
	// 	return {
	// 		error: 'Неверный пароль',
	// 		res: null,
	// 	};
	// }

	// return {
	// 	error: null,
	// 	res: {
	// 		id,
	// 		login,
	// 		name,
	// 		email,
	// 		session: sessions.create(user),
	// 	},
	// };
};
