import { useCallback, useContext, useEffect, useState } from 'react';
import { MangoQuery, RxDocument } from 'rxdb';
import { Subscription } from 'rxjs';

import { BusinessLayerContext } from '~/businessLogic';
import {setCompany as setCompanyAction} from "~businessLogic/actions/companyActions";

export type Company = {
	companyId: string;
	name?: string;
};

export const useCompany = (query?: MangoQuery) => {
	const businessLayer = useContext(BusinessLayerContext);

	const [companies, setCompanies] = useState<Company[] | null>(null);

	useEffect(() => {
		let subscription: Subscription;
		if (businessLayer?.db) {
			const liveQuery = businessLayer.db['company']?.find(query).$;

			subscription = liveQuery?.subscribe((resultSet: RxDocument[]) => {
				setCompanies(resultSet.map((r) => r.toJSON() as Company));
			});
		}

		return () => {
			subscription?.unsubscribe();
		};
	}, [query, businessLayer?.db]);

	const set = useCallback(
		(item: Company) => {
			if (businessLayer?.dispatch) {
				businessLayer.dispatch(setCompanyAction(item));
			}
		},
		[businessLayer?.dispatch]
	);

	return {
		companies: companies,
		setCompany: set,
	};
};
