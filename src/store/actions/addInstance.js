import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        instanceConfigurations: [
            ...state.instanceConfigurations,
            action.payload
        ],
    }
};

export default registerAction('ADD_INSTANCE', reducer);