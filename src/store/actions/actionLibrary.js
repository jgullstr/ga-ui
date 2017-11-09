let actionLibrary = {}

export const registerAction = (type, reducer) => {
    actionLibrary[type] = reducer;
}

export const unregisterAction = (type) => {
    delete actionLibrary[type];
}

export default actionLibrary;
