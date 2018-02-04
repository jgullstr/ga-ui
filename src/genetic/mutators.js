import {singleMasks, fullMasks} from './codecs';
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

/**
 * Linear inbreeding depression.
 * 
 * @param  {Integer} bitSize Amount of bits in value to mutate.
 * @return {Function} Function that mutates a binary value by flipping bits with probability p.
 */
export const linearDepression = bitSize => (min_p, max_p) => function(value) {
    let mask = singleMasks[bitSize - 1];
    let parents = new Uint32Array(this.parents[this.childIndex]);
    const max_parent = Math.max(...parents);
    const min_parent = Math.min(...parents);
    const max_value = fullMasks[bitSize - 1] >>> 0;
    const p = max_p - (max_p - min_p)*(max_parent - min_parent) / max_value;
    while (mask) {
        if (randomBoolean(p)) {
            value ^= mask;
        }
        mask >>>= 1;
    }
    return value;
}

/**
 * Exponential inbreeding depression.
 * 
 * @param  {Integer} bitSize Amount of bits in value to mutate.
 * @return {Function} Function that mutates a binary value by flipping bits with probability p.
 */
export const exponentialDepression = bitSize => (min_p, max_p, exponent) => function(value) {
    let mask = singleMasks[bitSize - 1];
    let parents = new Uint32Array(this.parents[this.childIndex]);
    const max_parent = Math.max(...parents);
    const min_parent = Math.min(...parents);
    const max_value = fullMasks[bitSize - 1] >>> 0;

    const distance = (max_parent - min_parent) / max_value;
    const p = (max_p - min_p)*(1 - Math.pow(distance, exponent)) + min_p;
    while (mask) {
        if (randomBoolean(p)) {
            value ^= mask;
        }
        mask >>>= 1;
    }
    return value;
}

const mutators = {
    RANDOM: {
        name: "Random mutation",
        description: "Flip each allele with a probability p.",
        fn: mutateRandom,
        params: [
            {
                name: "Probability",
                description: "Probability for a single mutation.",
                type: 'float',
                range: [0,1],
                default: 0.01
            }
        ]
    },
    TRICKY: {
        name: "Inbreeding depression (linear)",
        description: "Mutation probability decreases linearily relative to the binary difference between parents.",
        fn: linearDepression,
        params: [
            {
                name: "Minimal probability",
                description: "Minimal mutation probability (when parents are vastly different).",
                type: 'float',
                range: [0,1],
                default: 0.01
            },
            {
                name: "Maximal probability",
                description: "Maximal mutation probability (parents have same value).",
                type: 'float',
                range: [0,1],
                default: 0.01
            }
        ]
    },
    EXPONENTIAL_DEPRESSION: {
        name: "Inbreeding depression (exponential)",
        description: "Mutation probability decreases relative to the binary difference between parents.",
        fn: exponentialDepression,
        params: [
            {
                name: "Minimal probability",
                description: "Minimal mutation probability (when parents are vastly different).",
                type: 'float',
                range: [0,1],
                default: 0.01
            },
            {
                name: "Maximal probability",
                description: "Maximal mutation probability (parents have same value).",
                type: 'float',
                range: [0,1],
                default: 0.01
            },
            {
                name: "Exponent",
                description: "Inverse rate of exponential descent.",
                type: 'float',
                range: [0,10],
                default: 2
            }
        ]
    }
};

export default mutators;