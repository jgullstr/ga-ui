import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        ui: {
          ...state.ui,
          displayDrawer: !state.ui.displayDrawer
        }
    }
};

export default registerAction('TOGGLE_DRAWER', reducer);