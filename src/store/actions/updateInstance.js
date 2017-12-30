import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        ...action.payload
    }
};

export default registerAction('UPDATE_INSTANCE', reducer, ['instanceConfigurations']);