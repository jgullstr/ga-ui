import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        ui: {
            ...state.ui,
            viewMode: action.payload,
        }
    }
};

export default registerAction('SET_VIEW_MODE', reducer);