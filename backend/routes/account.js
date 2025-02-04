const express = require("express");
const authenticated = require("../middlewares/authenticated");
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

router.post("/", authenticated, async (req, res) => {
	try {
		const newAccount = await addAccount(req.body);

		res.send({ data: mapAccount({ ...newAccount, amount: 0 }) });
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.get("/:id", authenticated, async (req, res) => {
	const account = await getAccount(req.params.id);

	res.send({
		data: { account },
	});
});

router.patch("/:id", authenticated, async (req, res) => {
	try {
		await editAccount(req.params.id, req.body);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: e.message });
	}
});

router.delete("/:id", authenticated, async (req, res) => {
	await deleteAccount(req.params.id);
	await deleteTransactionByAccount(req.params.id);
	res.send({ error: null });
});

router.post("/type_account", authenticated, async (req, res) => {
	try {
		const newTypeAccount = await addTypeAccount(req.body.name);

		res.send({ data: mapTypeAccount(newTypeAccount) });
	} catch (e) {
		res.send({ error: e.message });
	}
});

module.exports = router;
