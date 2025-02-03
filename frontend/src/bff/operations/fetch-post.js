import { getPost } from '../api';
import { commentsWithAuthor } from '../utils';

export const fetchPost = async (postId) => {
	let post;
	let error;
	try {
		post = await getPost(postId);
	} catch (postError) {
		error = postError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	return {
		error: null,
		res: {
			...post,
			comments: await commentsWithAuthor(postId),
		},
	};
};
