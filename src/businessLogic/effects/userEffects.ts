import { defer } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { Effect } from '~/businessLogic';

import { EditUserCompanyAction, SetUserAction, UserActionTypes } from '../actions/userActions';
import { ofType } from '../operators/ofType';

export const setUserEffect: Effect<SetUserAction> = (actions$, dependencies) =>
	actions$.pipe(
		ofType(UserActionTypes.SetUser),
		concatMap((action: SetUserAction) =>
			defer(async () => {
				const user = await dependencies.db['user']
					.findOne({
						selector: {
							userId: {
								$eq: action.payload.userId,
							},
						},
					}).exec();

				if (!user)
				await dependencies.db['user'].upsert({ ...action.payload });
			})
		)
	);

export const editUserCompanyEffect: Effect<EditUserCompanyAction> = (actions$, dependencies) =>
	actions$.pipe(
		ofType(UserActionTypes.EditUserCompany),
		concatMap((action: EditUserCompanyAction) =>
			defer(async () => {
				const user = await dependencies.db['user']
					.findOne({
						selector: {
							userId: {
								$eq: action.payload.userId,
							},
						},
					}).exec();
				await user.atomicPatch({ companyId: action.payload.companyId });
			})
		)
	);
