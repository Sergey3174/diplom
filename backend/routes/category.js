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
	addCategory,
	editCategory,
	deleteCategory,
	getOneCategory,
} = require("../controllers/category");
const {
	getCategoryTransactions,
	updateTypeTransaction,
	deleteTransactionByCategory,
} = require("../controllers/transaction");
const mapCategory = require("../helpers/mapCategory");

const router = express.Router({ mergeParams: true });

router.get("/:id", async (req, res) => {
	const category = await getOneCategory(req.params.id);

	res.send({
		data: { category },
	});
});

router.post("/", async (req, res) => {
	try {
		const newCategory = await addCategory(req.body);

		res.send({ data: mapCategory({ ...newCategory, amount: 0 }) });
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const updateCategory = await editCategory(req.params.id, req.body);

		if (req.body.type !== updateCategory.type) {
			await updateTypeTransaction(req.params.id, req.body.type);
		}

		res.send({ data: "ok" });
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.delete("/:id", async (req, res) => {
	await deleteCategory(req.params.id);
	await deleteTransactionByCategory(req.params.id);
	res.send({ error: null });
});

module.exports = router;
