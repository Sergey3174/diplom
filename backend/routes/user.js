const express = require("express");
const {
	getUsers,
	getRoles,
	updateUser,
	deleteUser,
	replacePassword,
	replaceLogin,
} = require("../controllers/user");

const hasRole = require("../middlewares/hasRole");
const authenticated = require("../middlewares/authenticated");
const mapUser = require("../helpers/mapUser");
const ROLES = require("../constants/roles");
const { deleteUserComments } = require("../controllers/comment");
const { deleteTransactionByUser } = require("../controllers/transaction");
const { deleteAccountByUser } = require("../controllers/account");
const { deleteCategoryByUser } = require("../controllers/category");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const users = await getUsers();

	res.send({ data: users.map(mapUser) });
});

router.get(
	"/roles",
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		const roles = getRoles();

		res.send({ data: roles });
	}
);

router.patch("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
	await deleteUser(req.params.id);
	await deleteTransactionByUser(req.params.id);
	await deleteAccountByUser(req.params.id);
	await deleteCategoryByUser(req.params.id);

	res.send({ error: null });
});

module.exports = router;
