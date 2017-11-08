import { registerAction } from './actionLibrary';

const SAVE_DATA = 'SAVE_DATA';

const reducer = (state = {}, action) => {
    return {
        ...state,
        data: state.data.map((instanceData, i) => [...instanceData, ...action.payload[i]])
    }
};

const actionCreator = (payload) => ({
    type: SAVE_DATA,
    payload: payload,
});
registerAction(SAVE_DATA, reducer);

export default actionCreator