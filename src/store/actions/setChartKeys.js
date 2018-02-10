import { registerAction } from './actionLibrary';

const reducer = (state = [], action) => {
    return {
        ...state,
        [action.payload]: !state[action.payload]
    };
};

export default registerAction('SET_CHART_KEYS', reducer, ['ui', 'chartKeys']);