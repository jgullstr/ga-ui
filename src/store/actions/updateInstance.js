import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        instanceConfiguration: state.instanceConfiguration.map((config, i) => {
            if (i === action.payload.index) {
                return {
                    ...config,
                    ...action.payload.data
                }
            }
            return config;
        })
    }
};

export default registerAction('UPDATE_INSTANCE', reducer);