import { registerAction } from './actionLibrary';
import genetic from '../../genetic';

const functions = genetic.functions;

const reducer = (state = {}, action) => {
    return {
        ...state,
        fn: action.payload,
        argRanges: functions[action.payload]['defaultRanges']
    };
};

export default registerAction('GLOBAL_FUNCTION_SET', reducer);