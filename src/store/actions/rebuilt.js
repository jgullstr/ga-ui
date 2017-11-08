import { registerAction } from './actionLibrary';

const REBUILT = 'REBUILT';

const reducer = (state = {}, action) => {
    const instanceConfiguration = state.instanceConfiguration.map((config) => ({...config, rebuild: false}));
    return {
        ...state,
        instanceConfiguration: instanceConfiguration,
        rebuild: false,
    }
};

const actionCreator = (payload) => ({
    type: REBUILT,
    payload: payload,
});
registerAction(REBUILT, reducer);

export default actionCreator