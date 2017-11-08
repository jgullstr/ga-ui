import { registerAction } from './actionLibrary';

const RESET_GLOBAL = 'RESET_GLOBAL';

const reducer = (state = {}, action) => {
    return {
        ...state,
        globalConfiguration: {
            ...state.globalConfiguration,
            locked: false
        },
        evolve: 0,
        generation: 0,
        rebuild: false,
        data: []
    }
};

const actionCreator = (payload) => ({
    type: RESET_GLOBAL,
    payload: payload,
});
registerAction(RESET_GLOBAL, reducer);

export default actionCreator