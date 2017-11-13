import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        data: state.data.map((instanceData, i) => [...instanceData, ...action.payload[i]])
    }
};

export default registerAction('SAVE_DATA', reducer);