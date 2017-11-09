let functionLibrary = {}

export const registerFunction = (key, fn) => {
    functionLibrary[key]  = fn;
}

export const unregisterFunction = (key) => {
    delete functionLibrary[key];
}

export default functionLibrary;
