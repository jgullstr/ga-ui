let actionLibrary = {}

export const registerAction = (type, reducer, basePath) => {
    actionLibrary[type] = [reducer, basePath];
    return (payload, path = []) => ({
        type: type,
        payload: payload,
        path: path
    });
}

export const unregisterAction = (type) => {
    delete actionLibrary[type];
}

export default actionLibrary;
