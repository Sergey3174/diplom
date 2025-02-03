const dateTransform = require("./date-transform");

module.exports = function (transaction) {
	return {
		id: transaction._id,
		userId: transaction.userId,
		accountId: transaction.accountId,
		categoryId: transaction.categoryId,
		amount: transaction.amount,
		type: transaction.type,
		description: transaction.description,
		transactionDate: dateTransform(transaction.createdAt),
		createdAt: transaction.createdAt,
	};
};
