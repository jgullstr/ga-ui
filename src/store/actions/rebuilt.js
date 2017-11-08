import { registerAction } from './actionLibrary';

const REBUILT = 'REBUILT';

const reducer = (state = {}, action) => {
    return {
        ...state,
        rebuild: false,
    }
};

const actionCreator = (payload) => ({
    type: REBUILT,
    payload: payload,
});
registerAction(REBUILT, reducer);

export default actionCreator