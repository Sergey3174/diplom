const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const types = require("../constants/types");

const TransactionSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		accountId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Account",
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
		type: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
