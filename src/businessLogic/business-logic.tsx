import { createContext } from 'react';
import {
	RxDatabase,
	RxJsonSchema,
	createRxDatabase,
} from 'rxdb';
import { getRxStorageLoki } from 'rxdb/plugins/lokijs';
import { Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// in the browser, we want to persist data in IndexedDB, so we use the indexeddb adapter.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LokiIncrementalIndexedDBAdapter = require('lokijs/src/incremental-indexeddb-adapter');

export interface Action<T = any> {
	type: T;
}

interface Options<D = Dependencies> {
	dependencies: D;
}

interface Dependencies {
	db: RxDatabase;
}

export declare interface Effect<
	Input extends Action = any,
	Output extends Action = any
> {
	(action$: Subject<Input>, dependencies: Dependencies): Observable<Output>;
}

export interface EntityDescriptor<T = any> {
	[name: string]: {
		schema: RxJsonSchema<T>;
		migrationStrategies?: any;
		subscription?: any;
		authentication?: boolean;
	};
}

interface BusinessLayer {
	db: RxDatabase;
	addEffect: (effect: Effect) => void;
	dispatch: (action: Action) => void;
}

const initDatabase = async () => {
	const db = await createRxDatabase({
		name: 'test',
		storage: getRxStorageLoki({
			adapter: new LokiIncrementalIndexedDBAdapter(),
		}),
	});
	return db;
};

const epic$ = new Subject<Effect<Action, Action>>();
const actionSubject$ = new Subject<Action>();
let initialized = false;

const dispatch = (action: Action) => {
	actionSubject$.next(action);
};

export const bootstrapBusinessLogic = async (
	collections: EntityDescriptor[],
): Promise<BusinessLayer> => {
	const db = await initDatabase();

	const collectionsObject = collections.reduce((obj, item) => {
		return {
			...obj,
			...item,
		};
	}, {});

	await db.addCollections(collectionsObject);

	// TODO generate RxDB Replication from EntityDescriptor
	const opts = {
		dependencies: {
			db: db,
		},
	};
	initActionStream(opts);

	initialized = true;

	return {
		db,
		dispatch,
		addEffect,
	};
};

const initActionStream = (options: Options) => {
	const result$ = epic$.pipe(
		mergeMap((effect) => {
			const output$ = effect(actionSubject$, options.dependencies);

			if (!output$) {
				throw new TypeError(
					`Your root Effect "${
						effect.name || '<anonymous>'
					}" does not return a stream. Double check you're not missing a return statement!`
				);
			}

			return output$;
		})
	);

	result$.subscribe((action: Action) => {
		dispatch(action);
	});
};

export const addMultipleEffects = (effects: Effect[]) => {
	effects.forEach(addEffect);
};

export const addEffect = (effect: Effect) => {
	if (!initialized) {
		throw new Error('before adding effects, initActionStream must be called');
	}
	epic$.next(effect);
};

export const BusinessLayerContext = createContext<BusinessLayer | undefined>(
	undefined
);
