import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';

export const PrivateRoute = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const userId = useSelector(selectUserId); // Получаем userId из Redux store

	useEffect(() => {
		setLoading(false);
	}, [userId]);

	// Пока идет загрузка
	if (loading) {
		return <div>Загрузка...</div>; // Индикатор загрузки
	}

	// Если нет данных пользователя, перенаправляем на страницу входа
	return userId ? children : <Navigate to="/login" />;
};
