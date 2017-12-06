import { registerAction } from './actionLibrary';

const reducer = (state = false, action) => {
    return !state;
};

export default registerAction('TOGGLE_DRAWER', reducer, ['ui', 'displayDrawer']);