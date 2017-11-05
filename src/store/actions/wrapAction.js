export default (type, reducer) => {
    return {
        type: type,
        actionCreator: (payload) => ({
            type: type,
            payload: payload,
        }),
        reducer: reducer
    }
}
