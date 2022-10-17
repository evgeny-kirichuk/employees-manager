import { defer } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { Effect } from '~/businessLogic';

import { CompanyActionTypes, SetCompanyAction } from '../actions/companyActions';
import { ofType } from '../operators/ofType';

export const setCompanyEffect: Effect<SetCompanyAction> = (actions$, dependencies) =>
	actions$.pipe(
		ofType(CompanyActionTypes.SetCompany),
		concatMap((action: SetCompanyAction) =>
			defer(async () => {
				const company = await dependencies.db['company']
					.findOne({
						selector: {
							companyId: {
								$eq: action.payload.companyId,
							},
						},
					}).exec();

				if (!company)
				await dependencies.db['company'].upsert({ ...action.payload });
			})
		)
	);
