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
const ROLES = require("../constants/roles");
const {
	addTransaction,
	editTransaction,
	getTransactions,
	deleteTransaction,
	getTransaction,
	getQueryTransactions,
} = require("../controllers/transaction");
const calculateAmount = require("../helpers/calculate-amount");
const { getAccount, getAccounts } = require("../controllers/account");
const { getCategory, getOneCategory } = require("../controllers/category");
const mapAccount = require("../helpers/mapAccount");
const mapCategory = require("../helpers/mapCategory");
const mapTransaction = require("../helpers/mapTransaction");

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
	try {
		const newTransaction = await addTransaction(req.body);
		const transactions = await getTransactions(req.body.userId).lean();
		const account = await getAccount(req.body.accountId).lean();
		const category = await getOneCategory(req.body.categoryId).lean();

		console.log(account);
		account.amount = calculateAmount(transactions, account._id, "account");

		category.amount = calculateAmount(
			transactions,
			category._id,
			"category"
		);
		console.log(account);
		res.send({
			account: mapAccount(account),
			category: mapCategory(category),
		});
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		console.log("ya tut");
		const updateTransaction = await editTransaction(
			req.params.id,
			req.body
		);

		const transactions = await getTransactions(req.body.userId).lean();
		const accounts = await getAccounts(req.body.userId).lean();
		const categories = await getCategory(req.body.userId).lean();

		let newCategory = null;
		let newAccount = null;
		console.log(
			req.body.categoryId,
			updateTransaction.categoryId.toString()
		);
		if (req.body.categoryId !== updateTransaction.categoryId.toString()) {
			console.log("kek");
			newCategory = categories
				.filter(
					({ _id }) =>
						_id.toString() ===
							updateTransaction.categoryId.toString() ||
						_id.toString() === req.body.categoryId
				)
				.map((cat) => ({
					...cat,
					amount: calculateAmount(transactions, cat._id, "category"),
				}));
		} else {
			newCategory = categories
				.filter(
					({ _id }) =>
						_id.toString() ===
						updateTransaction.categoryId.toString()
				)
				.map((cat) => ({
					...cat,
					amount: calculateAmount(transactions, cat._id, "category"),
				}));
		}

		if (req.body.accountId !== updateTransaction.accountId.toString()) {
			newAccount = accounts
				.filter(
					({ _id }) =>
						_id.toString() ===
							updateTransaction.accountId.toString() ||
						_id.toString() === req.body.accountId
				)
				.map((acc) => ({
					...acc,
					amount: calculateAmount(transactions, acc._id, "account"),
				}));
		} else {
			newAccount = accounts
				.filter(
					({ _id }) =>
						_id.toString() ===
						updateTransaction.accountId.toString()
				)
				.map((acc) => ({
					...acc,
					amount: calculateAmount(transactions, acc._id, "account"),
				}));
		}

		res.send({
			newCategory: newCategory.map(mapCategory),
			newAccount: newAccount.map(mapAccount),
		});
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.delete("/:id", async (req, res) => {
	const removeTransaction = await deleteTransaction(req.params.id);

	const transactions = await getTransactions(removeTransaction.userId).lean();
	const account = await getAccount(removeTransaction.accountId).lean();
	const category = await getOneCategory(removeTransaction.categoryId).lean();

	account.amount = calculateAmount(transactions, account._id, "account");

	category.amount = calculateAmount(transactions, category._id, "category");

	res.send({
		error: null,
		data: {
			account: mapAccount(account),
			category: mapCategory(category),
		},
	});
});

router.get("/balance", async (req, res) => {
	const { transactions, lastPage } = await getQueryTransactions(
		req.query.userId,
		req.query.type,
		req.query.accountId,
		req.query.categoryId,
		req.query.limit,
		req.query.page,
		req.query.sort
	);

	console.log("balance");

	const balanceDateTransactions = transactions.reduce(
		(acc, { createdAt, amount, type }) => {
			const currentAmount = acc.currentAmount;
			const newAmount =
				type === "income"
					? currentAmount + amount
					: currentAmount - amount;

			acc.accTransactions.push({ createdAt, balance: newAmount });
			acc.currentAmount = newAmount;

			return acc;
		},
		{ currentAmount: 0, accTransactions: [] }
	);
	res.send({ data: { balanceDateTransactions } });
});

router.get("/:id", async (req, res) => {
	const transaction = await getTransaction(req.params.id);

	res.send({
		transaction: mapTransaction(transaction),
	});
});

router.get("/", async (req, res) => {
	const { transactions, lastPage } = await getQueryTransactions(
		req.query.userId,
		req.query.type,
		req.query.accountId,
		req.query.categoryId,
		req.query.limit,
		req.query.page,
		req.query.sort
	);

	res.send({
		data: { lastPage, transactions: transactions.map(mapTransaction) },
	});
});

module.exports = router;
