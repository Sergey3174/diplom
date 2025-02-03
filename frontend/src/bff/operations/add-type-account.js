import { addAccountType } from '../api';

export const addTypeAccount = async (name) => {
	const typeAccount = await addAccountType(name);

	return {
		error: null,
		res: {
			typeAccount,
		},
	};
};
