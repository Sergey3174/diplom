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
	addAccount,
	getAccount,
	editAccount,
	deleteAccount,
} = require("../controllers/account");
const { addTypeAccount } = require("../controllers/typeAccount");
const { deleteTransactionByAccount } = require("../controllers/transaction");
const mapAccount = require("../helpers/mapAccount");
const mapTypeAccount = require("../helpers/mapTypeAccount");

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
	try {
		const newAccount = await addAccount(req.body);
		console.log(mapAccount({ ...newAccount, amount: 0 }));
		res.send({ data: mapAccount({ ...newAccount, amount: 0 }) });
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.get("/:id", async (req, res) => {
	const account = await getAccount(req.params.id);

	res.send({
		data: { account },
	});
});

router.patch("/:id", async (req, res) => {
	try {
		await editAccount(req.params.id, req.body);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.delete("/:id", async (req, res) => {
	await deleteAccount(req.params.id);
	await deleteTransactionByAccount(req.params.id);
	res.send({ error: null });
});

router.post("/type_account", async (req, res) => {
	try {
		const newTypeAccount = await addTypeAccount(req.body.name);
		console.log(mapTypeAccount(newTypeAccount));
		res.send({ data: mapTypeAccount(newTypeAccount) });
	} catch (e) {
		res.send({ error: e.message });
	}
});

module.exports = router;
