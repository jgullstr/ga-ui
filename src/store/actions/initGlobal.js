import { registerAction } from './actionLibrary';

const reducer = (state = {}, action) => {
    return {
        ...state,
        locked: true,
        rebuild: true
    };
};

export default registerAction('INIT_GLOBAL', reducer, ['globalConfiguration']);