/**
 * Create a wrapped Redux action/actionCreator/reducer object.
 * 
 * @param {String} type The action type name.
 * @param {Function} reducer The reducer to apply on this action.
 * @returns {Object} Object {
 *   type: {String} action type name,
 *   actionCreator: {Function(payload)} creating redux action object,
 *   reducer: {Function} the reducer
 * }
 */
const wrapAction = (type, reducer) => ({
    type: type,
    actionCreator: (payload) => ({
        type: type,
        payload: payload,
    }),
    reducer: reducer
});

export default wrapAction;