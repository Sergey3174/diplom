import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Modal, PrivateRoute, SideBar } from './components';
import {
	Authorization,
	MainPage,
	HistoryPage,
	FormPage,
	Analitics,
	Registration,
	UserPage,
	ErrorPage,
} from './pages';

import styled from 'styled-components';
import { useEffect, useLayoutEffect, useState } from 'react';
import { loadDataAsync, setUser } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from './selectors';

interface AppFlexContainerProps {
	className?: string;
	children: React.ReactNode;
}

const AppFlexContainer = ({ className, children }: AppFlexContainerProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [initialized, setInitialized] = useState<boolean>(false);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	console.log(initialized);
	useEffect(() => {
		if (!initialized && location.pathname !== '/') {
			dispatch(loadDataAsync(userId));
		}
	}, [dispatch, userId, location.pathname, initialized]);

	useEffect(() => {
		sessionStorage.setItem('lastRoute', location.pathname);
	}, [location.pathname]);

	useEffect(() => {
		if (initialized) return;
		const lastRoute = sessionStorage.getItem('lastRoute');

		if (lastRoute && lastRoute !== location.pathname) {
			navigate(lastRoute);
		}

		setInitialized(true);
	}, [navigate, location.pathname, initialized]);

	return <div className={className}>{children}</div>;
};

const AppFlex = styled(AppFlexContainer)`
	display: flex;

	@media (max-width: 1000px) {
		display: inline-block;
		width: 100%;
	}
`;

const Page = styled.div`
	margin: 0 10px 0 280px;
	width: 100%;

	@media (max-width: 1000px) {
		margin: 80px 0px 70px 0px;
		font-size: 0.8rem;
	}
`;

const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<>
			<Modal />
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<AppFlex>
								<SideBar />
								<Page>
									<Outlet />
								</Page>
							</AppFlex>
						</PrivateRoute>
					}
				>
					<Route path="/" element={<MainPage />} />
					<Route path="/history" element={<HistoryPage />} />
					<Route path="/transaction" element={<FormPage />} />
					<Route path="/transaction/:id" element={<FormPage />} />
					<Route path="/category" element={<FormPage />} />
					<Route path="/category/:id" element={<FormPage />} />
					<Route path="/account" element={<FormPage />} />
					<Route path="/account/:id" element={<FormPage />} />
					<Route path="/analitics" element={<Analitics />} />
					<Route path="/user-page" element={<UserPage />} />
					<Route
						path="*"
						element={<ErrorPage error="Такой страницы не существует" />}
					/>
				</Route>
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Authorization />} />
			</Routes>
		</>
	);
};

export default App;
