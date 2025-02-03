import { getComments, getPosts } from '../api';
import { getCommentsCount } from '../utils/get-comments-count';

export const fetchPosts = async (searchPhrase, page, limit) => {
	const [{ posts, last }, comments] = await Promise.all([
		getPosts(searchPhrase, page, limit),
		getComments(),
	]);

	return {
		error: null,
		res: {
			posts: posts.map((post) => ({
				...post,
				commentsCount: getCommentsCount(comments, post.id),
			})),
			last,
		},
	};
};
