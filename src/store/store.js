import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root.reducer';
import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';

const sagaMiddleWare = createSagaMiddleware();

const middleWares = [
	process.env.NODE_ENV !== 'production' && logger,
	sagaMiddleWare,
	thunk,
].filter(Boolean);

const composedEnhancer =
	(process.env.NODE_ENV !== 'production' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

const persistConfig = {
	key: 'root',
	storage,
	blackList: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
