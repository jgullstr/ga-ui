import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        instanceConfiguration: {
            ...state.instanceConfiguration,
            ...action.payload
        },
    }
};

export default registerAction('ADD_INSTANCE', reducer);