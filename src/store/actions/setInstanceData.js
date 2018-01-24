import { registerAction } from './actionLibrary';

const reducer = (state = [], action) => {
    return action.payload;
};

export default registerAction('SET_INSTANCE_DATA', reducer, ['data']);