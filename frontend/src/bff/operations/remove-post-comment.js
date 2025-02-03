import { deleteComment, getPost } from '../api';
import { ROLE } from '../constans';
import { sessions } from '../sessions';
import { commentsWithAuthor } from '../utils';

export const removePostComment = async (hash, postId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteComment(id);

	const post = await getPost(postId);

	return {
		error: null,
		res: {
			...post,
			comments: await commentsWithAuthor(postId),
		},
	};
};
