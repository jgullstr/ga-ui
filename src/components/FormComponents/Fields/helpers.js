
/**
 * Convenience function for mapping material-ui onChange values into
 * a flat redux payload.
 * 
 * @param {*} dispatch
 * @param {*} storeKey 
 */
export const dispatchSetValue = (dispatch, storeKey) => (event, key, value) => {
    // RadioButtonGroup's onChange signature is (event: object, value: undefined).
    // Others' signature is (event, key, value).
    if (typeof(value) === 'undefined') {
      value = key;
    }
    return dispatch({[storeKey]: value});
}