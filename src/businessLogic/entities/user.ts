import { EntityDescriptor } from '../business-logic';
import { userSchema } from '../schemas/user';

export const userEntity: EntityDescriptor = {
	user: {
		schema: userSchema,
	},
};
