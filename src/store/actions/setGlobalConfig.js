import { registerAction } from './actionLibrary';

const GLOBAL_CONFIG_SET = 'GLOBAL_CONFIG_SET';

const reducer = (state = {}, action) => {
    return {
        ...state,
        globalConfiguration: {
            ...state.globalConfiguration,
            ...action.payload,
        }
    }
};

const actionCreator = (payload) => ({
    type: GLOBAL_CONFIG_SET,
    payload: payload,
});
registerAction(GLOBAL_CONFIG_SET, reducer);

export default actionCreator