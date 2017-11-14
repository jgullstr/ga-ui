import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        generation: action.payload
    }
};

export default registerAction('SET_GENERATION', reducer);