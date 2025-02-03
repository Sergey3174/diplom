const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const types = require("../constants/types");

const TypeAccountSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

const TypeAccount = mongoose.model("TypeAccount", TypeAccountSchema);

module.exports = TypeAccount;
