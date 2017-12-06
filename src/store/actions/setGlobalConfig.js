import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        ...action.payload,
    };
};

export default registerAction('GLOBAL_CONFIG_SET', reducer, ['globalConfiguration']);