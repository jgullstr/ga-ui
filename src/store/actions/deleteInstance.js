import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        instanceConfigurations: state.instanceConfigurations.filter((value, index) => index !== action.payload),
        data: state.data.map(instanceData => instanceData.filter((value, index) => index !== action.payload)),
    };
};

export default registerAction('DELETE_INSTANCE', reducer);