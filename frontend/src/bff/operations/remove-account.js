import { deleteAccount } from '../api';

export const removeAccount = async (id) => {
	await deleteAccount(id);
	return {
		error: null,
		res: true,
	};
};
