/**
 * Get a random boolean.
 * @param  {float}   p Probability for true
 * @returns {boolean}
 */
export const randomBoolean = (p) => Math.random() < p;

/**
 * Get random number within range.
 * @param  {Number}  min (inclusive)
 * @param  {Number}  max (exclusive)
 * @returns {float}       Number in range.
 */
export const randomReal = (min, max) => Math.random() * (max - min) + min;

/**
 * Get random integer within range.
 * @param  {Number}  min (inclusive)
 * @param  {Number}  max (exclusive)
 * @returns {integer}     Integer in range.
 */
export const randomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Populate a typed array with random data (in-place).
 * @param  {TypedArray} array to populate.
 */
export const randomizeTypedArray = (array) => window.crypto.getRandomValues(array);
