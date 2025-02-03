module.exports = function (user) {
	return {
		id: user.id,
		login: user.login,
		registeredAt: user.createdAt,
		name: user.name || "",
		email: user.email || "",
	};
};
