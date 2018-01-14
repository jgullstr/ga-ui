import { registerAction } from './actionLibrary';

const reducer = (locked = false, action) => {
    return action.payload;
};

export default registerAction('SET_GLOBAL_LOCK', reducer, ['globalConfiguration', 'locked']);