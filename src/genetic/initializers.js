import {randomizeTypedArray} from './random';
import {fullMasks} from './codec';

const randomInit = (populationSize) => {
    const result = new Int32Array(populationSize);
    randomizeTypedArray(result);
    return result;
}

let globalRandoms = new Int32Array();
const globalRandomInit = (populationSize) => {
    // Not enough values in current array, extend.
    if (populationSize > globalRandoms.length) {
        var newArray = new Int32Array(populationSize);
        newArray.set(globalRandoms);
        newArray.set(randomInit(populationSize - globalRandoms.length), globalRandoms.length);
    }
    return globalRandoms.slice(populationSize);
}

const initializers = [
    {
        name: 'Random (global)',
        description: 'Every instance will be initialized with the same random values.',
        fn: globalRandomInit
    },
    {
        name: 'Random (per instance)',
        description: 'Every instance will be initialized with random values.',
        fn: randomInit
    },
];

export default initializers;