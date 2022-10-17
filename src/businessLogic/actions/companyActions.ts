import { Company } from '~businessLogic';

export interface CompanyAction {
	type: CompanyActionTypes;
}

export enum CompanyActionTypes {
	SetCompany = '[Company] Set Company',
}

export interface SetCompanyAction extends CompanyAction {
	type: CompanyActionTypes.SetCompany;
	payload: Company;
}

export const setCompany = (company: Company): SetCompanyAction => ({
	type: CompanyActionTypes.SetCompany,
	payload: {
		...company,
	},
});
