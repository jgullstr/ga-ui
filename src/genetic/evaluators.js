/**
 * Higher fitness implies a better solution.
 * 
 * @param {*} x Value
 * @returns {*}
 */
export const maxValue = x => x;

/**
 * Lower fitness implies a better solution.
 * 
 * @param {*} x Value
 * @returns {*}
 */
export const minValue = x => -x;


const evaluators = [
    {
        name: 'Maximize',
        description: 'Find maximum value.',
        fn: maxValue,
    },
    {
        name: 'Minimize',
        description: 'Find minimum value.',
        fn: minValue,
    }
];

export default evaluators;