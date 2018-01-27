import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        generation: 0,
        data: state.data.map((v) => [])
    }
};

export default registerAction('CLEAR_DATA', reducer);