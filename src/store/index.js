import { createStore, applyMiddleware, compose } from 'redux';
import actionObjs from './actions';


const reducer = (state = [], action) => {
  if (actionObjs.hasOwnProperty(action.type)) {
    return actionObjs[action.type].reducer(action.payload);
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
  enhancer
);
