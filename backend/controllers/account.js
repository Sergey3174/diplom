const mongoose = require("mongoose");
const Account = require("../models/Accounts");
const Comment = require("../models/Comment");

async function addAccount(account) {
	const userObjectId = new mongoose.Types.ObjectId(account.userId);
	const typesAccountObjectId = new mongoose.Types.ObjectId(
		account.type_accounts
	);
	const newAccount = await Account.create({
		userId: userObjectId,
		type_accounts: typesAccountObjectId,
		name: account.name,
	});
	return newAccount.toObject();
}

function getAccounts(id) {
	return Account.find({ userId: id });
}

function getAccount(id) {
	return Account.findById(id);
}

async function editAccount(id, account) {
	const userObjectId = new mongoose.Types.ObjectId(account.userId);
	const typesAccountObjectId = new mongoose.Types.ObjectId(
		account.type_accounts
	);

	await Account.findByIdAndUpdate(id, {
		userId: userObjectId,
		type_accounts: typesAccountObjectId,
		name: account.name,
	});
}

async function deleteAccount(id) {
	await Account.findOneAndDelete({ _id: id });
}

async function deleteAccountByUser(id) {
	await Account.deleteMany({ userId: id });
}

module.exports = {
	addAccount,
	getAccounts,
	getAccount,
	editAccount,
	deleteAccount,
	deleteAccountByUser,
};
