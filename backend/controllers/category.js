const mongoose = require("mongoose");
const Category = require("../models/Categories");
const Comment = require("../models/Comment");

async function addCategory(category) {
	const userObjectId = new mongoose.Types.ObjectId(category.userId);

	const newCategory = await Category.create({
		userId: userObjectId,
		type: category.type,
		name: category.name,
	});
	return newCategory.toObject();
}

async function editCategory(id, category) {
	const userObjectId = new mongoose.Types.ObjectId(category.userId);

	const newCategory = await Category.findByIdAndUpdate(id, {
		userId: userObjectId,
		type: category.type,
		name: category.name,
	});

	return newCategory;
}

function getCategory(id) {
	return Category.find({ userId: id });
}

function getOneCategory(id) {
	return Category.findById(id);
}

async function deleteCategory(id) {
	await Category.findOneAndDelete({ _id: id });
}

async function deleteCategoryByUser(id) {
	await Category.deleteMany({ userId: id });
}

module.exports = {
	addCategory,
	getCategory,
	getOneCategory,
	editCategory,
	deleteCategory,
	deleteCategoryByUser,
};
