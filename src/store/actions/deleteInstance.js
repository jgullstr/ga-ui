import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        instanceConfigurations: state.instanceConfigurations.filter((value, index) => index !== action.payload),
        data: state.data.filter((value, index) => index !== action.payload)
    };
};

export default registerAction('DELETE_INSTANCE', reducer);