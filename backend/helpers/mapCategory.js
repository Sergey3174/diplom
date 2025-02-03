module.exports = function (category) {
	return {
		id: category._id,
		userId: category.userId,
		type: category.type,
		name: category.name,
		amount: category.amount,
	};
};
