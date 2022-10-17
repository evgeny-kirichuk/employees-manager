import React from 'react';

import { Company, useUser } from '~businessLogic';

import styles from './Company.module.scss';

const CompanyComponent: React.FC<{ company: Company }> = ({ company }) => {
	const { users, editUserCompany } = useUser({
		selector: {
			companyId: {
				$eq: company.companyId,
			},
		},
	});

	return (
		<div className={styles.wrapper}>
			<span className={styles.styledSpan}>{company.name}</span>
			{users?.length !== 0 && (
				<div className={styles.employees}>
					{users?.map((u) => (
						<div key={u.userId} className={styles.employee}>
							<span className={styles.employeeName}>{u.name}</span>
							<button
								onClick={() => {
									editUserCompany({ userId: u.userId, companyId: null });
								}}
							>
								x
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CompanyComponent;
