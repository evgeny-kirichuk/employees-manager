export const companySchema = {
	title: 'company schema',
	version: 0,
	primaryKey: 'companyId',
	type: 'object',
	properties: {
		companyId: { type: 'string' },
		name: { type: 'string' },
	},
	required: ['companyId'],
};
