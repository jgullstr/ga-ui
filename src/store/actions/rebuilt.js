import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        globalConfiguration: {...state.globalConfiguration, rebuild: false},
        instanceConfiguration: state.instanceConfiguration.map((config) => ({...config, rebuild: false})),
    }
};

export default registerAction('REBUILT', reducer);