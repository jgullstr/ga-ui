import { registerAction } from './actionLibrary';

const reducer = (state, action) => {
    return action.payload;
};

export default registerAction('UPDATE_CONFIGURATION_VALUE', reducer);