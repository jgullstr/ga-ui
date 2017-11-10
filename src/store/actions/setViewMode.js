import { registerAction } from './actionLibrary';

const SET_VIEW_MODE = 'SET_VIEW_MODE';

const reducer = (state = {}, action) => {
    return {
        ...state,
        ui: {
            ...state.ui,
            viewMode: action.payload,
        }
    }
};

const actionCreator = (payload) => ({
    type: SET_VIEW_MODE,
    payload: payload,
});
registerAction(SET_VIEW_MODE, reducer);

export default actionCreator