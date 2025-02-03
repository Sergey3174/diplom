const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const types = require("../constants/types");

const AccountSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		type_accounts: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "TypeAccount",
		},
	},
	{ timestamps: true }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
