import wrapAction from './wrapAction';

const reducer = (state = {}, action) => action.payload;

export const GLOBAL_CONFIG_SET = 'GLOBAL_CONFIG_SET';
export default wrapAction(GLOBAL_CONFIG_SET, reducer);