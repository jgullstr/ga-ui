import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    console.log(state);
    console.log(action);
    return state.map((config, index) => {
        if (index === action.payload.index) {
            return {
                ...config,
                activeTab: action.payload.value
            }
        }
        return config;
    });
};

export default registerAction('SET_INSTANCE_TAB', reducer, ['instanceConfigurations']);