import wrapAction from './wrapAction';

const reducer = (state = {}, action) => Object.assign({}, state, {global: action.payload});

export const GLOBAL_CONFIG_SET = 'GLOBAL_CONFIG_SET';
const wrapped = wrapAction(GLOBAL_CONFIG_SET, reducer);

export const actionCreator = wrapped.actionCreator;

export default wrapped