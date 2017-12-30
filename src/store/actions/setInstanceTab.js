import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return action.payload.value
};

export default registerAction('SET_INSTANCE_TAB', reducer, ['instanceConfigurations']);