import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        globalConfiguration: {...state.globalConfiguration, rebuild: false},
        instanceConfigurations: state.instanceConfigurations.map((config) => ({...config, rebuild: false})),
    }
};

export default registerAction('REBUILT', reducer);