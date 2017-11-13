import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        globalConfiguration: {
            ...state.globalConfiguration,
            locked: false,
            rebuild: false
        },
        evolve: 0,
        generation: 0,
        data: []
    }
};

export default registerAction('RESET_GLOBAL', reducer);