export const userSchema = {
	title: 'user schema',
	version: 0,
	primaryKey: 'userId',
	type: 'object',
	properties: {
		userId: { type: 'string' },
		name: { type: 'string' },
		companyId: {type: ['string', 'null']},
	},
	required: ['userId', 'name'],
};
