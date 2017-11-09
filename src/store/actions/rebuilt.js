import { registerAction } from './actionLibrary';

const REBUILT = 'REBUILT';

const reducer = (state = {}, action) => {
    return {
        ...state,
        globalConfiguration: {...state.globalConfiguration, rebuild: false},
        instanceConfiguration: state.instanceConfiguration.map((config) => ({...config, rebuild: false})),
    }
};

const actionCreator = (payload) => ({
    type: REBUILT,
    payload: payload,
});
registerAction(REBUILT, reducer);

export default actionCreator