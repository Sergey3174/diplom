import { transformPost } from '../transformers';
export const getPosts = (searchPhrase, page, limit) => {
	if (searchPhrase) {
		return fetch(`http://localhost:3005/posts`)
			.then((data) => data.json())
			.then((data) => {
				const postsIncludes = data.filter(({ title }) =>
					title.toLowerCase().includes(searchPhrase.toLowerCase()),
				);
				const last = Math.ceil(postsIncludes.length / limit);
				const posts = postsIncludes.filter(
					(_, index) => Math.ceil((index + 1) / limit) === page,
				);
				return {
					posts: posts && posts.map(transformPost),
					last,
				};
			});
	}

	return fetch(`http://localhost:3005/posts?_page=${page}&_per_page=${limit}`)
		.then((data) => data.json())
		.then(({ data, last }) => {
			return {
				posts: data && data.map(transformPost),
				last,
			};
		});
};
