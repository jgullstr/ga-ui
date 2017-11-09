/**
 * Bit masks for single bits 1-32.
 */
export const singleMasks = new Int32Array([
    0x1, 0x2, 0x4, 0x8,
    0x10, 0x20, 0x40, 0x80,
    0x100, 0x200, 0x400, 0x800,
    0x1000, 0x2000, 0x4000, 0x8000,
    0x10000, 0x20000, 0x40000, 0x80000,
    0x100000, 0x200000, 0x400000, 0x800000,
    0x1000000, 0x2000000, 0x4000000, 0x8000000,
    0x10000000, 0x20000000, 0x40000000, 0x80000000,
]);

/**
 * Bit masks for all bits set in range 1-32.
 */
export const fullMasks = new Int32Array([
    0x1, 0x3, 0x7, 0xF,
    0x1F, 0x3F, 0x7F, 0xFF,
    0x1FF, 0x3FF, 0x7FF, 0xFFF,
    0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF,
    0x1FFFF, 0x3FFFF, 0x7FFFF, 0xFFFFF,
    0x1FFFFF, 0x3FFFFF, 0x7FFFFF, 0xFFFFFF,
    0x1FFFFFF, 0x3FFFFFF, 0x7FFFFFF, 0xFFFFFFF,
    0x1FFFFFFF, 0x3FFFFFFF, 0x7FFFFFFF, 0xFFFFFFFF,
]);

/**
 * Generate encoder for float values in range min-max within bitSize bits.
 * 
 * @param {Integer} bitSize * 
 * @returns {Function}
 */
const binEncoder = (bitSize) => (min) => (max) => (value) => {
    if (value < min || value > max) {
        throw new RangeError(`Value ${value} is out of range ]${min}-${max}[.`);
    }
    return Math.round((value - min) * fullMasks[bitSize - 1] / (max - min));
}

/**
 * Generate decoder for float values in range min-max within bitSize bits.
 * 
 * @param {Integer} bitSize
 * @returns {Function}
 */
const binDecoder = (bitSize) => (min, max) => (value) => min + (max - min) * (value >>> 0) / (fullMasks[bitSize - 1] >>> 0);

/**
 * Codec class for encoding/decoding real-valued arguments within set ranges to binary values.
 */
export class bin32Codec {
    /**
     * Constructor.
     * 
     * @param {Array} ranges Array of [min, max] argument domains. 
     * @param {Array} argLengths Array of bitSizes allocated to each argument. Defaults to equal amount for each argument. 
     * @param {Integer} bitSize Amount of bits to store arguments in.
     */
    constructor(ranges, argLengths = null, bitSize = 32) {
        /** @type {Integer} */
        this.argCount = ranges.length;
        if (argLengths === null) {
            // Each argument is contained within equal-length values.
            /** @type {Array} */
            this.argLengths = Array(this.argCount).fill(Math.floor(bitSize / this.argCount));
        }
        else {
            if (argLengths.length !== ranges.length) {
                throw new RangeError('argLengths/ranges size mismatch.');
            }
            bitSize = argLengths.reduce((sum, x) => x + sum);
            this.argLengths = argLengths;
        }
        if (bitSize < 1 || bitSize > 32) {
            throw new RangeError(`bitSize ${bitSize} is out of range ]1-32[.`);
        }

        /** @type {Array} */
        this._encoders = [];
        /** @type {Array} */
        this._decoders = [];
        let i = -1;
        while (++i < this.argCount) {
            let [min, max] = ranges[i];
            this._encoders.push(binEncoder(this.argLengths[i])(min, max));
            // Decoders are executed in reverse order.
            this._decoders.unshift(binDecoder(this.argLengths[i])(min, max));
        }
    }

    /**
     * Encode real-valued arguments into a single Int32 (approximate).
     * 
     * @param {Array} args Array of arguments to encode.
     * @returns {Integer} Integer representation of arguments.
     */
    encode(args) {
        if (args.length !== this._encoders.length) {
            throw new RangeError('Invalid arguments length.');
        }
        return this._encoders.reduce((value, encode, i) => {
            value <<= this.argLengths[i];
            return value |= encode(args[i]);
        }, 0);
    }

    /**
     * Decode Int32 into array of real-valued arguments.
     * @param {Integer} value Binary representation to decode.
     * @returns {Array} Array of arguments contained within value.
     */
    decode(value) {
        return this._decoders.reduce((args, decode, i) => {
            const argLength = this.argLengths[this.argCount - i - 1];
            const mask = fullMasks[argLength - 1];
            args.unshift(decode(value & mask));
            value >>>= argLength;
            return args;
        }, []);
    }
};

const codecs = {
    BIN32: {
        name: "Real to binary",
        description: "Maps range of real values into binary values.",
        class: bin32Codec,
        params: []
    }
};

export default codecs;