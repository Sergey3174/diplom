import { addAccount, updateAccount } from '../api';

export const saveAccount = async (newAccountData) => {
	if (newAccountData.id === '') {
		const newAccount = await addAccount(newAccountData);
		return { res: { ...newAccount, amount: 0 } };
	} else {
		await updateAccount(newAccountData);
	}
};
