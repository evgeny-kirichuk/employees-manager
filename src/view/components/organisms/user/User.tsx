import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { User, useCompany, useUser } from '~businessLogic';

import styles from './User.module.scss';

const UserComponent: React.FC<{ user: User }> = ({ user }) => {
	const { t } = useTranslation('content');
	const { editUserCompany } = useUser();
	const { companies } = useCompany();
	const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
		user.companyId
	);

	useEffect(() => {
		editUserCompany({
			userId: user.userId,
			companyId: selectedCompanyId === '0' ? null : selectedCompanyId,
		});
	}, [selectedCompanyId]);

	return (
		<div className={styles.wrapper}>
			<span className={styles.styledSpan}>{user.name}</span>
			<select
				className={styles.styledSelect}
				onChange={(e) => setSelectedCompanyId(e.target.value)}
				value={selectedCompanyId || 0}
			>
				<option key={1} value={0}>
					{t('not_employed')}
				</option>
				{companies?.map((c) => (
					<option key={c.companyId} value={c.companyId}>
						{c.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default UserComponent;
