import {randomBoolean, randomInteger} from './random';
import {fullMasks} from './codec';

/**
 * Crossover two binary values.
 * @param {Int32} value1 Binary value of parent1.
 * @param {Int32} value2 Binary value of parent2.
 * @param {Integer} pos Crossover position.
 * @returns {Array} Tuple of resulting offspring.
 */
const crossover = (value1, value2, pos) => {
  const mask = fullMasks[pos];
  return [
    (value1 & ~mask) | (value2 & mask),
    (value2 & ~mask) | (value1 & mask)
  ];
}

/**
 * Generate n-point crossover function on two binary values.
 * Each crossover is executed with probability p.
 * 
 * @param {Integer} bitSize Amount of bits in value.
 * @returns {Function}
 */
export const crossoverNPoints = bitSize => n => p => {
  return (value1, value2) => {
    let pointsLeft = n;
    while (pointsLeft--) {
      if (randomBoolean(p)) {
        [value1, value2] =  crossover(value1, value2, randomInteger(0, bitSize - 1));
      }
    }
    return [value1, value2];
  }
}

/**
 * Single point crossover.
 * 
 * @param {Integer} bitSize Amount of bits in value.
 * @returns {Function}
 */
export const crossoverSinglePoint = (bitSize) => crossoverNPoints(bitSize)(1);

/**
 * Uniform crossover.
 * 
 * Swap each bit between parents with equal probability.
 *  
 * @param {Integer} bitSize Amount of bits in value.
 * @returns {Function}
 */
export const crossoverUniform = (bitSize) => (v1, v2, mask = fullMasks[bitSize - 1]) => {
  while (mask) {
    if (randomBoolean(0.5)) {
      v1 = (v1 & ~mask) | (v2 & mask);
      v2 = (v2 & ~mask) | (~v2 & mask);
    }
    mask >>= 1;
  }
  return [v1, v2];
}

/**
 * Unchristian three-parent crossover.
 * Create 3 children from 3 parents.
 */
export const menageATrois = (bitSize) => {
  const fn = crossoverUniform(bitSize);
  return (v1,v2,v3) => [
    fn(v1 & v2, v3)[0],
    fn(v2 & v3, v1)[0],
    fn(v3 & v1, v2)[0]
  ];
}
