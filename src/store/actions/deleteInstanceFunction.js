import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return state.filter((value, index) => index !== action.payload);
};

export default registerAction('DELETE_INSTANCE_FUNCTION', reducer, ['instanceConfigurations']);