import { registerAction } from './actionLibrary';

const reducer = (state = false, action) => {
    return action.payload !== undefined ? action.payload : !state;
};

export default registerAction('TOGGLE_DRAWER', reducer, ['ui', 'displayDrawer']);