import React from 'react';

import CompanyManager from '~organisms/companyManager/CompanyManager';
import { useCompany } from '~businessLogic';
import CompanyComponent from '~organisms/company/Company';

import styles from './Companies.module.scss';

const Companies = () => {
	const { companies } = useCompany();

	return (
		<div className={styles.wrapper}>
			<CompanyManager />
			{companies?.map((c) => (
				<CompanyComponent key={c.companyId} company={c} />
			))}
		</div>
	);
};

export default Companies;
