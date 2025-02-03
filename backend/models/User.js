const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const roles = require("../constants/roles");

const UserSchema = new Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
			sparse: true,
			match: [/^\S+@\S+\.\S+$/, "Некорректный email"],
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
