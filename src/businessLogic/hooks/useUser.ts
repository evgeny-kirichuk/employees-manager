import { useCallback, useContext, useEffect, useState } from 'react';
import { MangoQuery, RxDocument } from 'rxdb';
import { Subscription } from 'rxjs';

import { BusinessLayerContext } from '~/businessLogic';

import {
	editUserCompany as editUserCompanyAction,
	setUser as setUserAction,
} from '../actions/userActions';
import { setCompany } from '../actions/companyActions';

export type User = {
	userId: string;
	name: string;
	companyId: string | null;
};

export const useUser = (query?: MangoQuery) => {
	const businessLayer = useContext(BusinessLayerContext);

	const [users, setUsers] = useState<User[] | null>(null);

	const populateData = () => {
		if (businessLayer?.db) {
			// populate test data
			businessLayer.dispatch(
				setCompany({ name: 'Gryffindor', companyId: '1' })
			);
			businessLayer.dispatch(
				setCompany({ name: 'Hufflepuff', companyId: '2' })
			);
			businessLayer.dispatch(setCompany({ name: 'Ravenclaw', companyId: '3' }));
			businessLayer.dispatch(setCompany({ name: 'Slytherin', companyId: '4' }));
			businessLayer.dispatch(setCompany({ name: 'Aror', companyId: '5' }));
			businessLayer.dispatch(
				setCompany({ name: 'Death Eaters', companyId: '6' })
			);

			businessLayer.dispatch(
				setUserAction({
					userId: '1',
					name: 'Godric Gryffindor',
					companyId: '1',
				})
			);
			businessLayer.dispatch(
				setUserAction({
					userId: '1',
					name: 'Godric Gryffindor',
					companyId: '1',
				})
			);
			businessLayer.dispatch(
				setUserAction({
					userId: '2',
					name: 'Minerva McGonagall',
					companyId: '1',
				})
			);
			businessLayer.dispatch(
				setUserAction({ userId: '3', name: 'Harry Potter', companyId: '1' })
			);
			businessLayer.dispatch(
				setUserAction({ userId: '4', name: 'Cedric Diggory', companyId: '2' })
			);
			businessLayer.dispatch(
				setUserAction({ userId: '5', name: 'Nymphadora Tonks', companyId: '2' })
			);
			businessLayer.dispatch(
				setUserAction({ userId: '6', name: 'Pomona Sprout', companyId: '2' })
			);
			businessLayer.dispatch(
				setUserAction({ userId: '7', name: 'Luna Lovegood', companyId: '3' })
			);
			businessLayer.dispatch(
				setUserAction({ userId: '8', name: 'Severus Snape', companyId: '4' })
			);
			businessLayer.dispatch(
				setUserAction({
					userId: '9',
					name: 'Horace Eugene Flaccus Slughorn',
					companyId: '4',
				})
			);
			businessLayer.dispatch(
				setUserAction({
					userId: '10',
					name: 'Hesphaestus Gore',
					companyId: '5',
				})
			);
			businessLayer.dispatch(
				setUserAction({
					userId: '11',
					name: 'Alastor «Mad-Eye» Moody',
					companyId: '5',
				})
			);
			businessLayer.dispatch(
				setUserAction({ userId: '12', name: 'Lucius Malfoy', companyId: '6' })
			);
			businessLayer.dispatch(
				setUserAction({
					userId: '13',
					name: 'Bellatrix Lestrange',
					companyId: '6',
				})
			);
			businessLayer.dispatch(
				setUserAction({ userId: '14', name: 'Rubeus Hagrid', companyId: null })
			);
			businessLayer.dispatch(
				setUserAction({ userId: '15', name: 'Dobby', companyId: null })
			);
		}
	};

	useEffect(() => {
		let subscription: Subscription;
		if (businessLayer?.db) {
			const liveQuery = businessLayer.db['user']?.find(query).$;

			subscription = liveQuery?.subscribe((resultSet: RxDocument[]) => {
				setUsers(resultSet.map((r) => r.toJSON() as User));
			});
		}

		return () => {
			subscription?.unsubscribe();
		};
	}, [businessLayer?.db]);

	const set = useCallback(
		(item: User) => {
			if (businessLayer?.dispatch) {
				businessLayer.dispatch(setUserAction(item));
			}
		},
		[businessLayer?.dispatch]
	);

	const editUserCompany = useCallback(
		(item: { userId: string; companyId: string | null }) => {
			if (businessLayer?.dispatch) {
				businessLayer.dispatch(editUserCompanyAction(item));
			}
		},
		[businessLayer?.dispatch]
	);

	return {
		users: users,
		setUser: set,
		editUserCompany: editUserCompany,
		pop: populateData,
	};
};
