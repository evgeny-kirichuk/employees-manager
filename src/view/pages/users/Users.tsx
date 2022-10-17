import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUser } from '~businessLogic';
import UserManager from '~organisms/userManager/UserManager';
import UserComponent from '~organisms/user/User';

import styles from './Users.module.scss';

const Users = () => {
	const { t } = useTranslation('content');
	const { users, pop } = useUser();
	const [showUnemployed, setShowUnemployed] = useState(false);

	useEffect(() => {
		pop();
	}, []);
	return (
		<div className={styles.wrapper}>
			<UserManager />
			{users && users?.length !== 0 && (
				<div className={styles.filter}>
					<input
						type="checkbox"
						id="show_unemployed"
						checked={showUnemployed}
						onChange={() => setShowUnemployed((prev) => !prev)}
					/>
					<label htmlFor="show_unemployed">{t('show_unemployed')}</label>
				</div>
			)}
			{users
				?.filter((u) => (showUnemployed ? u.companyId === null : true))
				.map((u) => (
					<UserComponent key={u.userId + u.companyId} user={u} />
				))}
		</div>
	);
};

export default Users;
