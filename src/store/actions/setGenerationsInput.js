import { registerAction } from './actionLibrary';

const reducer = (state = 0, action) => {
    return action.payload;
};

export default registerAction('SET_GENERATION_INPUT', reducer, ['ui', 'generations']);