import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCompany, useUser } from '~businessLogic';
import Button from '~atoms/button/Button';

import styles from './UserManager.module.scss';

const UserManager = () => {
	const { t } = useTranslation('content');
	const { setUser } = useUser();
	const { companies } = useCompany();
	const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
		null
	);
	const inputRef = useRef<HTMLInputElement>(null);

	const addUser = () => {
		if (inputRef.current?.value) {
			setUser({
				name: inputRef.current.value,
				companyId: selectedCompanyId,
				userId: Date.now().toString(),
			});
			inputRef.current.value = '';
		}
	};
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<input
					ref={inputRef}
					className={styles.styledInput}
					type="text"
					placeholder={t('enter_user_name')}
				/>
				<select
					className={styles.styledSelect}
					onChange={(e) => setSelectedCompanyId(e.target.value)}
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
			<Button onClick={addUser}>{t('add_user')}</Button>
		</div>
	);
};

export default UserManager;
