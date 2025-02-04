const TypeAccount = require("../models/TypeAccounts");

async function addTypeAccount(name) {
	const newAccountType = await TypeAccount.create({
		name,
	});
	return newAccountType;
}

function getTypeAccounts() {
	return TypeAccount.find();
}

module.exports = {
	addTypeAccount,
	getTypeAccounts,
};
