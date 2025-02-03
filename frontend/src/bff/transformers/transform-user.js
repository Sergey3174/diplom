export const transformUser = (dbUser) => ({
	id: dbUser.id,
	login: dbUser.login,
	password: dbUser.password,
	name: dbUser.name,
	email: dbUser.email,
	registeredAt: dbUser.registered_at,
});
