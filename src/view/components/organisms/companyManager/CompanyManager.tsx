import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useCompany } from '~businessLogic';
import Button from '~atoms/button/Button';

import styles from './CompanyManager.module.scss';

const CompanyManager = () => {
	const { t } = useTranslation('content');
	const { setCompany } = useCompany();
	const inputRef = useRef<HTMLInputElement>(null);

	const addCompany = () => {
		if (inputRef.current?.value) {
			setCompany({
				name: inputRef.current.value,
				companyId: Date.now().toString(),
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
					placeholder={t('enter_company_name')}
				/>
			</div>
			<Button onClick={addCompany}>{t('add_company')}</Button>
		</div>
	);
};

export default CompanyManager;
