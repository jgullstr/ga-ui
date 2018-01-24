import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        generation: 0,
        data: []
    }
};

export default registerAction('CLEAR_DATA', reducer);