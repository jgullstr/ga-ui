import { createStore, applyMiddleware } from 'redux';
import actionLibrary from './actions/actionLibrary';

import logger from 'redux-logger';
import geneticMiddleware from './middleware/geneticMiddleware';

/**
 * Create a new state by traversing array of nodes and cloning objects/arrays
 * in path.
 * 
 * @param {Object} state Store state object.
 * @param {Array} nodes Path to value to alter.
 * 
 * @returns {Array} [Reference to last node in path in new state, New state object]
 */
const traverseState = (state, action, reducer, nodes = []) => {
  // Action can define additional path.
  if (action.hasOwnProperty('path')) {
    nodes = [...nodes, ...action.path];
  }

  // Operate on entire state.
  if (nodes.length === 0) {
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

const reducer = (state = {}, action) => {
  if (actionLibrary.hasOwnProperty(action.type)) {
    const [reducer, basePath] = actionLibrary[action.type];
    return traverseState(state, action, reducer, basePath);
  }
  return state;
}

let middleware = [geneticMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    middleware.push(devToolsExtension())
  }
}

export const createStoreWithData = (initialState) => {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );
}
