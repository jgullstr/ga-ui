import { registerAction } from './actionLibrary';

const INIT_GLOBAL = 'INIT_GLOBAL';

const reducer = (state = {}, action) => {
    return {
        ...state,
        globalConfiguration: {
            ...state.globalConfiguration,
            locked: true
        },
        rebuild: true
    }
};

const actionCreator = (payload) => ({
    type: INIT_GLOBAL,
    payload: payload,
});
registerAction(INIT_GLOBAL, reducer);

export default actionCreator