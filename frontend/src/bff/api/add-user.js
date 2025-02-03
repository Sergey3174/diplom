import { transformUser } from '../transformers';
import { generateDate } from '../utils';

export const addUser = (login, password) =>
	fetch('http://localhost:3005/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registered_at: generateDate(),
			name: '',
			email: '',
		}),
	})
		.then((createdUser) => createdUser.json())
		.then((createdUser) => createdUser && transformUser(createdUser));
