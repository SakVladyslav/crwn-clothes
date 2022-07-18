import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root.reducer';
import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
type ExtendedPersistCofig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[];
};

const sagaMiddleWare = createSagaMiddleware();

const middleWares = [
	process.env.NODE_ENV !== 'production' && logger,
	sagaMiddleWare,
	thunk,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancer =
	(process.env.NODE_ENV !== 'production' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

const persistConfig: ExtendedPersistCofig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
