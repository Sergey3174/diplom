import { setPostData } from './set-post-data';

export const savePostAsync = (requestServer, newPostData) => (dispatch) => {
	return requestServer('savePost', newPostData).then((updatedPost) => {
		dispatch(setPostData(updatedPost.res));
		return updatedPost.res;
	});
};
