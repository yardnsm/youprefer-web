/* global __DEV__ */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './reducers';

const initialState = {};

const middlewares = [
  thunkMiddleware,
];

if (__DEV__) {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares),
);

// Support for HMR
if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer);
  });
}

export default store;
