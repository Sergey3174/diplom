import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../selectors';

export const PrivateRoute = ({ children }) => {
	// Получаем userId из Redux store
	const userId = useSelector(selectUserId);

	// Если нет данных о пользователе, перенаправляем на страницу логина
	if (userId === null) {
		// Если загрузка данных ещё не завершена, можно показать индикатор загрузки
		return;
	}

	return userId ? children : <Navigate to="/login" />;
};
