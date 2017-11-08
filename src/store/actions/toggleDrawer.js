import { registerAction } from './actionLibrary';

const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

const reducer = (state = {}, action) => {
    console.log('clickeyuuuu');
    return {
        ...state,
        ui: {
          ...state.ui,
          displayDrawer: !state.ui.displayDrawer
        }
    }
};

const actionCreator = (payload) => ({
    type: TOGGLE_DRAWER,
    payload: payload,
});
registerAction(TOGGLE_DRAWER, reducer);

export default actionCreator