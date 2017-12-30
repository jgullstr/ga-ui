import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return action.payload
};

export default registerAction('SET_VIEW_MODE', reducer, ['ui', 'viewMode']);