export const getTransaction = (id) =>
	fetch(`http://localhost:3005/transactions?id=${id}`).then((data) => data.json());
