import { deleteUser } from '../api';

export const removeUser = async (userId) => {
	deleteUser(userId);
	return {
		error: null,
		res: true,
	};
};
