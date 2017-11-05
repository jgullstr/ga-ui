export default (type, reducer) => {
    return {
        type: type,
        action: (payload) => ({
            type: type,
            payload: payload,
        }),
        reducer: reducer
    }
}
