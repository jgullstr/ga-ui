import { createStore, applyMiddleware, compose } from 'redux';
import actionObjs from './actions';

import logger from 'redux-logger'

const middleware = [
  logger
]

const reducer = (state = [], action) => {
  if (actionObjs.hasOwnProperty(action.type)) {
    return actionObjs[action.type].reducer(state, action);
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

let actionTypes = {};
for(var key in actionObjs) {
  if(actionObjs.hasOwnProperty(key)) {
    actionTypes[key] = key;
  }
}
export const actions = actionTypes;

export const createStoreWithData = (initialState) => createStore(
  reducer,
  initialState,
  composedEnhancers
);
