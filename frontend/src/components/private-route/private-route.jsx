import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUserId, selectUserSession } from '../../selectors';

export const PrivateRoute = ({ children }) => {
	const userId = useSelector(selectUserId);

	return userId ? children : <Navigate to="/login" />;
};
