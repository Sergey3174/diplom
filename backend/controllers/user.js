const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/roles");

// register

async function register(login, password) {
	if (!password) {
		throw new Error("Password is empty");
	}
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({ login, password: passwordHash });
	const token = generate({ id: user.id });
	return { user, token };
}

async function replacePassword(id, password) {
	const user = await User.findOne({ _id: id });

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (isPasswordMatch) {
		throw new Error("Придумайте новый пароль");
	}

	const passwordHash = await bcrypt.hash(password, 10);

	await User.findByIdAndUpdate(id, { password: passwordHash });
}
async function replaceLogin(id, login) {
	const user = await User.findOne({ login });

	if (user) {
		throw new Error("Логин занят");
	}

	await User.findByIdAndUpdate(id, { login: login });
}

//login
async function login(login, password) {
	const user = await User.findOne({ login });

	if (!user) {
		throw new Error("User not found");
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error("Wrong password");
	}

	const token = generate({ id: user.id });

	return { user, token };
}

function deleteUser(id) {
	return User.deleteOne({ _id: id });
}

function updateUser(id, userData) {
	return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}

//logout

// delete

// edit (roles)

module.exports = {
	register,
	login,
	deleteUser,
	updateUser,
	replacePassword,
	replaceLogin,
};
