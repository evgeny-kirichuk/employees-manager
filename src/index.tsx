import React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from '~app/App';
import {
	BusinessLayerContext,
	addMultipleEffects,
	bootstrapBusinessLogic,
	companyEntity,
	editUserCompanyEffect,
	setCompanyEffect,
	setUserEffect,
	userEntity,
} from '~businessLogic';

import {
	registerServiceWorker,
	unregisterServiceWorker,
} from './serviceWorkerRegistration.js';

import './i18n';
import './index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const enableServiceWorkerStandCondition = process.env.APP_STAND !== 'local';
const enableServiceWorkerDefaultValue = 'false';
const enableServiceWorkerValue =
	process.env.APP_ENABLE_SERVICE_WORKER || enableServiceWorkerDefaultValue;
const shouldInstallServiceWorker =
	JSON.parse(enableServiceWorkerValue) && enableServiceWorkerStandCondition;

bootstrapBusinessLogic([userEntity, companyEntity]).then((businessLogic) => {
	addMultipleEffects([setUserEffect, setCompanyEffect, editUserCompanyEffect]);

	root.render(
		<BusinessLayerContext.Provider value={businessLogic}>
			<App />
		</BusinessLayerContext.Provider>
	);
});

root.render(
	<React.StrictMode>
		<App />
		asd
	</React.StrictMode>
);

if (shouldInstallServiceWorker) {
	registerServiceWorker();
}

if (!shouldInstallServiceWorker) {
	unregisterServiceWorker();
}
