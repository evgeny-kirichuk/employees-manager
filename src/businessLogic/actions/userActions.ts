import { User } from '~businessLogic';

export interface UserAction {
	type: UserActionTypes;
}

export enum UserActionTypes {
	SetUser = '[User] Set User',
	EditUserCompany = '[User] Edit User Company',
}

export interface SetUserAction extends UserAction {
	type: UserActionTypes.SetUser;
	payload: User;
}

export const setUser = (user: User): SetUserAction => ({
	type: UserActionTypes.SetUser,
	payload: {
		...user,
	},
});

export interface EditUserCompanyAction extends UserAction {
	type: UserActionTypes.EditUserCompany;
	payload: {
		userId: string;
		companyId: string | null;
	};
}

export const editUserCompany = (userCompany: {
	userId: string;
	companyId: string | null;
}): EditUserCompanyAction => ({
	type: UserActionTypes.EditUserCompany,
	payload: {
		...userCompany,
	},
});
