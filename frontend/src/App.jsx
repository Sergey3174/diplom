import { Outlet, Route, Routes } from 'react-router-dom';
import { Modal, PrivateRoute, SideBar } from './components';
import {
	Authorization,
	MainPage,
	HistoryPage,
	FormPage,
	Analitics,
	Registration,
	UserPage,
} from './pages';

import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { useDispatch } from 'react-redux';

const AppFlex = styled.div`
	display: flex;

	@media (max-width: 1000px) {
		display: inline-blok;
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

function App() {
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
				</Route>
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Authorization />} />
			</Routes>
		</>
	);
}

export default App;
