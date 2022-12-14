import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import Tabs from '~molecules/tabs/Tabs';
import Button from '~atoms/button/Button';

import styles from './Navigation.module.scss';

export const Navigation: React.FC<{ className?: string }> = ({ className }) => {
	const { t } = useTranslation('content');
	const navigate = useNavigate();
	const location = useLocation();

	const paths = [
		{
			pathname: '/users',
			pathlabel: t('tools.routing_users'),
			ariaLabel: t('aria_label.navigate_to_users'),
		},
		{
			pathname: '/companies',
			pathlabel: t('tools.routing_companies'),
			ariaLabel: t('aria_label.navigate_to_companies'),
		},
	];

	const activeTabIndex = paths.findIndex(
		(path) => location.pathname === path.pathname
	);

	const onNavButtonClick = (buttonIndex: number) => () => {
		navigate(paths[buttonIndex].pathname);
	};

	const navTabs = paths.map((path, index) => (
		<Button
			tabIndex={0}
			aria-label={path.ariaLabel}
			className={cn(styles.navButton, {
				[styles.active]: location.pathname === path.pathname,
			})}
			onClick={onNavButtonClick(index)}
			key={path.pathname}
		>
			{path.pathlabel}
		</Button>
	));

	return (
		<nav className={className}>
			<Tabs
				showIndicator={true}
				activeTabIndex={activeTabIndex}
				tabs={navTabs}
			/>
		</nav>
	);
};
