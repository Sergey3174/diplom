import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';
import { Loader } from '../loader/loader';

export const PrivateRoute = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const userId = useSelector(selectUserId);

	useEffect(() => {
		setLoading(false);
	}, [userId]);

	if (loading) {
		return <Loader />;
	}

	return userId ? children : <Navigate to="/login" />;
};
