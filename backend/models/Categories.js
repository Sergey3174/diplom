const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const types = require("../constants/types");

const CategorySchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
