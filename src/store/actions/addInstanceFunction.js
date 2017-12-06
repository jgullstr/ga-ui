import { registerAction } from './actionLibrary';

const reducer = (state = [], action) => {
    return state.map((config, index) => {
        if (index === action.payload.index) {
            return {
                ...config,
                [action.payload.key]: [
                    ...config[action.payload.key],
                    action.payload.fn
                ]
            }
        }
        return config;
    });
};

export default registerAction('ADD_INSTANCE_FUNCTION', reducer, ['instanceConfigurations']);