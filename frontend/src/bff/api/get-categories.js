export const getCategories = (userId) =>
	fetch(`http://localhost:3005/categories?userId=${userId}`)
		.then((data) => data.json())
		.then((data) => {
			return {
				categories: data,
			};
		});
