import { addCategory, getTransactions, updateCategory, updateTransaction } from '../api';

export const saveCategory = async (newCategoryData) => {
	if (newCategoryData.id === '') {
		const newCategory = await addCategory(newCategoryData);
		return { res: { ...newCategory, amount: 0 } };
	} else {
		const { transactions } = await getTransactions(newCategoryData.userId, '', '', {
			category: newCategoryData.id,
		});

		for (const t of transactions) {
			await updateTransaction({ id: t.id, type: newCategoryData.type });
		}

		await updateCategory(newCategoryData);
	}
};
