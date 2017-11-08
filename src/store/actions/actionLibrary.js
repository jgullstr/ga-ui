let actionLibrary = {}

export const registerAction = (type, reducer) => {
    console.log(type);
    actionLibrary[type] = reducer;
}

export const unregisterAction = (type) => {
    delete actionLibrary[type];
}

export const getActions = () => Object.assign({}, actionLibrary);
