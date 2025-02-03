const mongoose = require("mongoose");

module.exports = function (arr, id, param) {
	return arr.reduce((acc, { amount, categoryId, accountId, type }) => {
		switch (param) {
			case "category":
				return id.toString() === categoryId.toString()
					? amount + acc
					: acc;
			case "account":
				return id.toString() === accountId.toString()
					? type === "income"
						? amount + acc
						: acc - amount
					: acc;
			default:
				return 0;
		}
	}, 0);
};
