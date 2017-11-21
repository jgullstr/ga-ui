import { createStore, applyMiddleware, compose } from 'redux';
import actionLibrary from './actions/actionLibrary';
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'
import helloSaga from './sagas/helloSaga'

const sagaMiddleware = createSagaMiddleware(helloSaga)

let middleware = [
  sagaMiddleware
]

const reducer = (state = [], action) => {
  if (actionLibrary.hasOwnProperty(action.type)) {
    return actionLibrary[action.type](state, action);
  }
  return state;
}

let enhancer = x => x;
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancer = devToolsExtension()
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  enhancer
)

export const createStoreWithData = (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    composedEnhancers
  );
  sagaMiddleware.run(helloSaga);
  return store;
}
