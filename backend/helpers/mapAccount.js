module.exports = function (account) {
	return {
		id: account._id,
		userId: account.userId,
		name: account.name,
		type_accounts: account.type_accounts,
		created_at: account.createdAt,
		amount: account.amount,
	};
};
