const express = require("express");
const authenticated = require("../middlewares/authenticated");
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

router.get("/:id", authenticated, async (req, res) => {
	const category = await getOneCategory(req.params.id);

	res.send({
		data: { category },
	});
});

router.post("/", authenticated, async (req, res) => {
	try {
		const newCategory = await addCategory(req.body);

		res.send({ data: mapCategory({ ...newCategory, amount: 0 }) });
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.patch("/:id", authenticated, async (req, res) => {
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

router.delete("/:id", authenticated, async (req, res) => {
	await deleteCategory(req.params.id);
	await deleteTransactionByCategory(req.params.id);
	res.send({ error: null });
});

module.exports = router;
