import { createStore, applyMiddleware, compose } from 'redux';
import actionLibrary from './actions/actionLibrary';

import logger from 'redux-logger'

const middleware = [
  logger
]

const reducer = (state = [], action) => {
  if (actionLibrary.hasOwnProperty(action.type)) {
    return actionLibrary[action.type](state, action);
  }
  return state;
}

let enhancer = x => x;
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancer = devToolsExtension()
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  enhancer
)

export const createStoreWithData = (initialState) => createStore(
  reducer,
  initialState,
  composedEnhancers
);
