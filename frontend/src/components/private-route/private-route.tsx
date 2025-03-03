import { useEffect, useState, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';
import { Loader } from '../loader/loader';

interface PrivateRouteProps {
	children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	const userId = useSelector(selectUserId);

	useEffect(() => {
		setLoading(false);
	}, [userId]);

	if (loading) {
		return <Loader />;
	}

	return userId ? <>{children}</> : <Navigate to="/login" />;
};
