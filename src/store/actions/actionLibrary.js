let actionLibrary = {}

export const registerAction = (type, reducer) => {
    actionLibrary[type] = reducer;
    return (payload) => ({
        type: type,
        payload: payload,
    });
}

export const unregisterAction = (type) => {
    delete actionLibrary[type];
}

export default actionLibrary;
