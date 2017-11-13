import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        globalConfiguration: {
            ...state.globalConfiguration,
            ...action.payload,
        }
    }
};

export default registerAction('GLOBAL_CONFIG_SET', reducer);