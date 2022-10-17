import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Main from '~mainLayout/main/Main';
import LazyRoute from '~routes/LazyRoute';

const UsersScreen = lazy(
	() => import(/*webpackChunkName: "Users"*/ '~pages/users/Users')
);
const CompaniesScreen = lazy(
	() => import(/*webpackChunkName: "Companies"*/ '~pages/companies/Companies')
);

const AppRoutes: React.FunctionComponent = () => (
	<React.Suspense fallback={null}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />}>
					<Route
						path=""
						element={
							<LazyRoute>
								<UsersScreen />
							</LazyRoute>
						}
					/>
					<Route
						path="companies"
						element={
							<LazyRoute>
								<CompaniesScreen />
							</LazyRoute>
						}
					/>
					<Route
						path="users"
						element={
							<LazyRoute>
								<UsersScreen />
							</LazyRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/users" />} />
				</Route>

				<Route index element={<Navigate to="/users" />} />
			</Routes>
		</BrowserRouter>
	</React.Suspense>
);

export default AppRoutes;
