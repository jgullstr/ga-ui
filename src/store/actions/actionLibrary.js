let actionLibrary = {}

export const registerAction = (type, reducer, basePath) => {
    actionLibrary[type] = [reducer, basePath];
    return (payload) => ({
        type: type,
        payload: payload,
    });
}

export const unregisterAction = (type) => {
    delete actionLibrary[type];
}

export default actionLibrary;
