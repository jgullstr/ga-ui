import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return state.map((instanceData, i) => [...instanceData, ...action.payload[i]]);
};

export default registerAction('SAVE_DATA', reducer, ['data']);