import {singleMasks} from './codec';
import {randomBoolean} from './random';

/**
 * Generate random mutation function.
 * 
 * @param  {Integer} bitSize Amount of bits in value to mutate.
 * @return {Function} Function that mutates a binary value by flipping bits with probability p.
 */
export const mutateRandom = bitSize => p => value => {
    let mask = singleMasks[bitSize - 1];
    while (mask) {
        if (randomBoolean(p)) {
            value ^= mask;
        }
        mask >>>= 1;
    }
    return value;
}