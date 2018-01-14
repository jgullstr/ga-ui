import { registerAction } from './actionLibrary';

const reducer = (state, action) => {
    return action.payload;
};

export default registerAction('UPDATE_INSTANCE_FUNCTION', reducer, ['instanceConfigurations']);