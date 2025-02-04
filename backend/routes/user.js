const express = require("express");
const {
	updateUser,
	deleteUser,
	replacePassword,
	replaceLogin,
} = require("../controllers/user");

const authenticated = require("../middlewares/authenticated");
const mapUser = require("../helpers/mapUser");
const { deleteTransactionByUser } = require("../controllers/transaction");
const { deleteAccountByUser } = require("../controllers/account");
const { deleteCategoryByUser } = require("../controllers/category");

const router = express.Router({ mergeParams: true });

router.patch("/:id", authenticated, async (req, res) => {
	try {
		if (req.body.password) {
			await replacePassword(req.params.id, req.body.password);
		}

		if (req.body.login) {
			await replaceLogin(req.params.id, req.body.login);
		}

		const newUser = await updateUser(req.params.id, {
			name: req.body.name,
			email: req.body.email,
		});

		res.send({ data: mapUser(newUser) });
	} catch (e) {
		res.send({ error: e.message || "Unknown error" });
	}
});

router.delete("/:id", authenticated, async (req, res) => {
	await deleteUser(req.params.id);
	await deleteTransactionByUser(req.params.id);
	await deleteAccountByUser(req.params.id);
	await deleteCategoryByUser(req.params.id);

	res.send({ error: null });
});

module.exports = router;
