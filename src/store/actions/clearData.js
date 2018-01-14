import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        evolve: 0,
        generation: 0,
        data: []
    }
};

export default registerAction('CLEAR_DATA', reducer);