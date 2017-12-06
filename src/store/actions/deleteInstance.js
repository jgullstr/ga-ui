import { registerAction } from './actionLibrary';

const reducer = (state = [], action) => {
    return state.instanceConfigurations.map((config, i) => {
        if (i === action.payload) {
            return undefined;
        }
        return config;
    });
};

export default registerAction('DELETE_INSTANCE', reducer, ['instanceConfigurations']);