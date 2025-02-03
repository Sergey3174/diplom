const express = require("express");
const {
	getPosts,
	getPost,
	addPost,
	editPost,
	deletePost,
} = require("../controllers/post");
const { addComment, deleteComment } = require("../controllers/comment");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const mapPost = require("../helpers/mapPost");
const mapComment = require("../helpers/mapComment");
const calculateAmount = require("../helpers/calculate-amount");
const ROLES = require("../constants/roles");
const { getTransactions } = require("../controllers/transaction");
const { getAccounts } = require("../controllers/account");
const { getTypeAccounts } = require("../controllers/typeAccount");
const { getCategory } = require("../controllers/category");
const mapCategory = require("../helpers/mapCategory");
const mapAccount = require("../helpers/mapAccount");
const mapTypeAccount = require("../helpers/mapTypeAccount");
const mapTransaction = require("../helpers/mapTransaction");

const router = express.Router({ mergeParams: true });

router.get("/:id", async (req, res) => {
	console.log("skdjbckdsj");
	const transactions = await getTransactions(req.params.id).lean();
	const accounts = await getAccounts(req.params.id).lean();
	const categories = await getCategory(req.params.id).lean();
	const typeAccount = await getTypeAccounts();

	const newCategories = categories.map((cat) => {
		return {
			...cat,
			amount: calculateAmount(transactions, cat._id, "category"),
		};
	});

	const newAccounts = accounts.map((acc) => ({
		...acc,
		amount: calculateAmount(transactions, acc._id, "account"),
	}));

	const lastIncomeTransactions = transactions
		.filter(({ type }) => type === "income")
		.slice(0, 3);

	const lastExpenseTransactions = transactions
		.filter(({ type }) => type === "expense")
		.slice(0, 3);

	res.send({
		data: {
			categories: newCategories.map(mapCategory),
			accounts: newAccounts.map(mapAccount),
			typeAccount: typeAccount.map(mapTypeAccount),
			lastIncomeTransactions: lastIncomeTransactions.map(mapTransaction),
			lastExpenseTransactions:
				lastExpenseTransactions.map(mapTransaction),
		},
	});
});

module.exports = router;
