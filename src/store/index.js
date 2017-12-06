import { createStore, applyMiddleware, compose } from 'redux';
import actionLibrary from './actions/actionLibrary';
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'
import helloSaga from './sagas/helloSaga'

/**
 * Create a new state by traversing array of nodes and cloning objects/arrays
 * in path.
 * 
 * @param {Object} state Store state object.
 * @param {Array} nodes Path to value to alter.
 * 
 * @returns {Array} [Reference to last node in path in new state, New state object]
 */
const traverseState = (state, action, reducer, nodes = false) => {
  // Operate on entire state.
  if (!nodes || nodes.length == 0) {
    return reducer(state, action);
  }

  // Create new state, preserving unaltered path.
  let result = Object.assign({}, state);
  let base = result;
  let parent, index;

  // Find base path for reducer.
  nodes.forEach((node) => {
      if (base[node] instanceof Array) {
        base[node] = base[node].slice();
      }
      else if (base[node] instanceof Object) {
        base[node] = Object.assign({}, base[node]);
      }
      parent = base;
      index = node;
      base = base[node];
  });
  parent[index] = reducer(base, action);
  return result;
}

const sagaMiddleware = createSagaMiddleware(helloSaga)

let middleware = [
  sagaMiddleware
]

const reducer = (state = {}, action) => {
  if (actionLibrary.hasOwnProperty(action.type)) {
    const [reducer, basePath] = actionLibrary[action.type];
    return traverseState(state, action, reducer, basePath);
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
