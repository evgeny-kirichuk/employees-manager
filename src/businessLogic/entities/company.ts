import { EntityDescriptor } from '../business-logic';
import { companySchema } from '../schemas/company';

export const companyEntity: EntityDescriptor = {
	company: {
		schema: companySchema,
	},
};
