const mongoose = require("mongoose");
const Transaction = require("../models/Transactions");

async function addTransaction(transaction) {
	const accountObjectId = new mongoose.Types.ObjectId(transaction.accountId);
	const categoryObjectId = new mongoose.Types.ObjectId(
		transaction.categoryId
	);
	const userObjectId = new mongoose.Types.ObjectId(transaction.userId);

	const newTransaction = await Transaction.create({
		userId: userObjectId,
		accountId: accountObjectId,
		categoryId: categoryObjectId,
		type: transaction.type,
		description: transaction.description,
		amount: transaction.amount,
	});

	return newTransaction;
}

function getTransactions(id) {
	return Transaction.find({ userId: id }).sort({ createdAt: -1 });
}

function getCategoryTransactions(id) {
	return Transaction.find({ categoryId: id });
}

async function editTransaction(id, transaction) {
	const accountObjectId = new mongoose.Types.ObjectId(transaction.accountId);
	const categoryObjectId = new mongoose.Types.ObjectId(
		transaction.categoryId
	);
	const userObjectId = new mongoose.Types.ObjectId(transaction.userId);

	const newTransaction = await Transaction.findByIdAndUpdate(
		id,
		{
			userId: userObjectId,
			accountId: accountObjectId,
			categoryId: categoryObjectId,
			type: transaction.type,
			description: transaction.description,
			amount: transaction.amount,
		},
		{
			runValidators: true,
		}
	);

	return newTransaction;
}

function deleteTransaction(id) {
	return Transaction.findOneAndDelete({ _id: id });
}

function getTransaction(id) {
	return Transaction.findById(id);
}

async function updateTypeTransaction(id, type) {
	await Transaction.updateMany({ categoryId: id }, { $set: { type: type } });
}

async function deleteTransactionByCategory(id) {
	await Transaction.deleteMany({ categoryId: id });
}

async function deleteTransactionByAccount(id) {
	await Transaction.deleteMany({ accountId: id });
}
async function deleteTransactionByUser(id) {
	await Transaction.deleteMany({ userId: id });
}

async function getQueryTransactions(
	userId = null,
	type = null,
	accountId = null,
	categoryId = null,
	limit = 0,
	page = 0,
	sort = -1
) {
	const filter = {};

	if (userId) filter.userId = userId;
	if (type) filter.type = type;
	if (accountId) filter.accountId = accountId;
	if (categoryId) filter.categoryId = categoryId;

	const [transactions, count] = await Promise.all([
		Transaction.find(filter)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: sort }),
		Transaction.countDocuments(filter),
	]);

	return {
		transactions,
		lastPage: Math.ceil(count / limit),
	};
}

module.exports = {
	addTransaction,
	getTransactions,
	editTransaction,
	deleteTransaction,
	getTransaction,
	getCategoryTransactions,
	updateTypeTransaction,
	deleteTransactionByCategory,
	deleteTransactionByAccount,
	getQueryTransactions,
	deleteTransactionByUser,
};
