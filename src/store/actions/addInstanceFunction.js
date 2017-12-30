import { registerAction } from './actionLibrary';

const reducer = (state = [], action) => {
    return [
        ...state,
        action.payload
    ];
};

export default registerAction('ADD_INSTANCE_FUNCTION', reducer, ['instanceConfigurations']);