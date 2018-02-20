import {randomizeTypedArray} from './random';
import {minValue} from './evaluators';

/**
 * Population class. Does most of the heavy lifting.
 * Values are represented as 32-bit integers.
 */
export class bin32Population {
    /** 
     * @param {Integer} size Amount of chromosomes in population.
     * @param {Function} fn Function to optimize.
     * @param {Class} codec Class for mapping 32-bit values into arguments compatible with fn. Required method: codec.decode(Int32)
     * @param {Function} fitnessFn Function to determine fitness of produced values.
     * @param {Int32Array|Function} init Int32Array containing values or function to generate initial population. Defaults to random values.
     */
    constructor(size, fn, codec, fitnessFn = minValue, init = randomizeTypedArray) {
        /** @type {Integer} */
        this.size = parseInt(size, 10);

        /** @type {Function} */
        this.fn = fn;

        /** @type {Class} */
        this.codec = codec;

        /** @type {Function} */
        this.fitnessFn = fitnessFn;
        
        /** @type {Function} */
        this.init = init;

        /** @type {Integer} */
        this.executionTime = 0;

        if (init instanceof Int32Array) {
            /** @type {Int32Array} */
            this._values = init;
            this.size = init.length;
        }
        else if (typeof init === 'function') {
            this._values = init(size);
        }
        else {
            throw new TypeError(`init is of unknown type.`);
        }
    }

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @see https://github.com/lodash/lodash/blob/master/chunk.js
     * 
     * @param {number} size The length of each chunk
     * @returns {Array} Returns the new array of chunks.
     */
    chunk(size) {
        size = Math.max(size, 0)
        const length = this.size;
        const array = this._values;
        if (!length || size < 1) {
          return [];
        }
        let index = 0;
        let resIndex = 0;
        const result = new Array(Math.ceil(length / size));
      
        while (index < length) {
          result[resIndex++] = array.slice(index, (index += size));
        }
        return result;
      }

    /**
     * Clone current population.
     * @param {Int32Array} newValues Values in returned population. Defaults to current values.
     * @returns {bin32Population} new population containing identical buffer. No values are computed on
     * return, so its values can be safely altered until any other methods are called.
     */
    clone(newValues = this._values) {
        if (!(newValues instanceof Int32Array)) {
            throw new TypeError(`Values are of unknown type.`);
        }
        return new bin32Population(this.size, this.fn, this.codec, this.fitnessFn, newValues.slice());
    }

    /**
     * Creates a new bin32Population of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @see https://github.com/lodash/lodash/blob/master/shuffle.js
     * 
     * @returns {bin32Population} Returns the new shuffled bin32Population.
     */
    shuffle() {
        let i = -1;
        const length = this.size;
        const lastIndex = length - 1;
        const result = this._values.slice();
        while (++i < length) {
            const rand = i + Math.floor(Math.random() * (lastIndex - i + 1));
            const value = result[rand];
            result[rand] = result[i];
            result[i] = value;
        }
        return this.clone(result);
    }

    /**
     * Create a new bin32Population by invoking a function over current chromosomes.
     *
     * @param {Function} fn Function fn(value, index, bin32Population) to invoke on dataView elements.
     * @returns {bin32Population} Returns the new mapped bin32Population.
     */
    map(fn) {
        let i = -1;
        const length = this.size;
        const values = this._values;
        const result = new Int32Array(length);
        while (++i < length) {
            result[i] = fn(values[i], i, this);
        }
        return this.clone(result);
    }
    
    /**
     * Create new similar population from array of values.
     * @param {Array} array Array of 32-bit integers.
     * @returns {bin32Population} New population with array as values.
     */
    fromArray(array) {
        if (array.length !== this.size) {
            throw new RangeError(`Array needs to contain ${this.size} values.`);
        }
        if (array instanceof Int32Array) {
            return this.clone(array);
        }
        // Cast to typed array.
        let i = -1;
        const length = this.size;
        const result = new Int32Array(length);
        while (++i < length) {
            result[i] = array[i];
        }
        return this.clone(result);
    }

    /**
     * Create an array by invoking a function over the unsigned chromosome values.
     *
     * @param {Function} fn Function fn(value, index, bin32Population) to invoke on current values.
     * @returns {Array} Returns array of chromosome values piped through fn.
     */
    mapToArray(fn, context) {
        let i = -1;
        const length = this.size;
        const values = this._values;
        const result = new Array(length);
        while (++i < length) {
            result[i] = fn.call(context, values[i], i, this);
        }
        return result;
    }

    /**
     * Load function arguments contained within this.values
     * @returns {Array} Array of arrays containing arguments to pass to this.fn
     */
    args() {
        if (this._args === undefined) {
            /** @type {Array} */
            this._args = this.mapToArray(this.codec.decode, this.codec);
        }
        return this._args;
    }

    /**
     * Load values returned from this.fn.
     * @returns {Array} array of real values.
     */
    values() {
        if (this._realvalues === undefined) {
            /** @type {Int32Array} */
            this._realvalues = this.args().map((args) => this.fn.apply(this, args));
        }
        return this._realvalues;
    }

    /**
     * Get fitness weights from current values.
     * @returns {Array} array of fitness weights.
     */
    fitnesses() {
        if (this._fitnesses === undefined) {
            /** @type {Array} */
            this._fitnesses = this.values().map((value) => this.fitnessFn.call(this, value));
        }
        return this._fitnesses;
    }

    /**
     * Sum all fitness values.
     * @returns {Number} Sum of fitness values.
     */
    totalFitness() {
        if (this._totalFitness === undefined) {
            /** @type {Number} */
            this._totalFitness = this.fitnesses().reduce((x, y) => x + y, 0);
        }
        return this._totalFitness;
    }

    /**
     * Get average fitness of entire population.
     * @returns {Number} Average fitness.
     */
    averageFitness() {
        if (this._averageFitness === undefined) {
            /** @type {Number} */
            this._averageFitness = this.totalFitness() / this.size;
        }
        return this._averageFitness;
    }

    /**
     * Get average fitness of entire population.
     * @returns {array} [min, max] bin values in population.
     */
    valueRange() {
        if (this._valueRange === undefined) {
            /** @type {Number} */
            const uIntValues = new Uint32Array(this._values);
            this._valueRange = [Math.min(...uIntValues), Math.max(...uIntValues)];
        }
        return this._valueRange;
    }

    /**
     * Return best solution in population.
     * @returns {Object}
     */
    bestSolution() {
        if (this._bestSolution === undefined) {
            const fitnesses = this.fitnesses();
            const bestFitness = Math.max(...fitnesses);
            const i = fitnesses.indexOf(bestFitness);
            /** @type {Object} */
            this._bestSolution = {
                args: this.args()[i],
                binary: this._values[i],
                value: this.values()[i],
                fitness: this.fitnesses()[i]
            }
        }
        return this._bestSolution;
    }

    /**
     * Return worst solution in population.
     * @returns {Object}
     */
    worstSolution() {
        if (this._worstSolution === undefined) {
            const fitnesses = this.fitnesses();
            const worstFitness = Math.min(...fitnesses);
            const i = fitnesses.indexOf(worstFitness);
            /** @type {Object} */
            this._worstSolution = {
                args: this.args()[i],
                binary: this._values[i],
                value: this.values()[i],
                fitness: this.fitnesses()[i]
            }
        }
        return this._worstSolution;
    }

    chromosomes() {
        return this._values;
    }
};

const populations = {
    BINARY: {
        name: "Binary population",
        description: "Operates on binary values.",
        class: bin32Population,
        params: [
            {
                name: "Bit length",
                description: "Amount of bits (1-32) in each chromosome.",
                type: 'int',
                range: [1,32],
                default: 32
            }
        ]
    }
};

export default populations;