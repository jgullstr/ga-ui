import {randomReal, randomInteger, randomBoolean, randomizeTypedArray} from './random';

const loadBalancedFitnesses = (population) => {
    let totalFitness = population.totalFitness();
    let fitnessValues = population.fitnesses().slice();
    
    const minFitness = Math.min(...fitnessValues);
    const maxFitness = Math.max(...fitnessValues);

    // If all fitnesses are identical, give all a fitness value of one to
    // prevent issues with zero values in selectors.
    if (minFitness === maxFitness) {
        return {
            totalFitness: population.size,
            fitnessValues: Array(population.size).fill(1)
        }
    }

    // Ensure all fitness values are positive.
    // @note if minFitness is less than zero, the worst fitness value
    // will never be selected.
    if (minFitness < 0) {
        totalFitness -= minFitness * population.size;
        fitnessValues = fitnessValues.map((v) => v - minFitness);
    }

    return {
        totalFitness: totalFitness,
        fitnessValues: fitnessValues,
    }
}

/**
 * Tournament selection.
 *  
 * @param  {Population} population
 * @return {Population} Fitness-biased population for recombination.
 */
export const tournament = bitSize => (tournamentSize, p) => population => {
    const values = population._values;
    const fitnessValues = population.fitnesses();

    const matingPool = Array.from({length: population.size}, (v) => {
        const candidates = Array
            .from({length: tournamentSize}, () => randomInteger(0, population.size))
            .sort((a,b) => fitnessValues[a] - fitnessValues[b]);

        let i = candidates.length;
        while (--i) {
            if (randomBoolean(p)) {
                break;
            }
        }
        return values[candidates[i]];
    });

    return population.fromArray(matingPool);
};

/**
 * Roulette wheel selection.
 * 
 * Create a new, same-size population with members selected at a probability 
 * proportionate to their fitness.
 * 
 * @param  {Population} population
 * @return {Population} Fitness-biased population for recombination.
 */
export const rouletteWheel = bitSize => () => population => {

    const { totalFitness, fitnessValues } = loadBalancedFitnesses(population);

    // Find which index in fitness values contains value.
    const getMember = (value, i = 0) => {
        while (value > fitnessValues[i]) {
            value -= fitnessValues[i++];
        }
        return i;
    }

    // Spin the wheel!
    const spin = () => getMember(randomReal(0, totalFitness));
    const values = population._values;
    // Map random, fitness-proportionate values on the population.
    return population.map((c) => values[spin()]);
};

/**
 * Shuffle population.
 * 
 * Return shuffled population.
 * 
 * @param  {Population} population
 * @return {Population} Same population, with shuffled values.
 */
export const shuffle = bitSize => () => population => {
    return population.shuffle();
};

/**
 * Random population.
 * 
 * For reference. Discards all previous progress.
 * 
 * @param  {Population} population
 * @return {Population} Same population, with shuffled values.
 */
export const randomPopulation = bitSize => () => population => {
    const result = new Int32Array(population.size);
    randomizeTypedArray(result);
    return population.fromArray(result);
};

/**
 * Stochastic universal sampling.
 * 
 * Create a new, same-size population with members selected at an
 * even space from a random point.
 * 
 * @param  {Population} population
 * @return {Population} Fitness-biased population for recombination.
 */
export const stochasticUniversalSampling = bitSize => () => population => {

    const { totalFitness, fitnessValues } = loadBalancedFitnesses(population);
    const values = population._values;

    const newValues = [];
    const distance = totalFitness / population.size;

    let target = distance;
    let current = randomReal(0, distance);
    let index = 0;

    for (let i = 0; i < population.size; i++) {
        while (current < target) {
            current += fitnessValues[index++];
        }
        newValues.push(values[index - 1]);
        target += distance;
    }
    return population.fromArray(newValues);
};


const parentSelectors = {
    SHUFFLE: {
        name: "Shuffle",
        description: "Shuffles the chromosomes in the population. Does no selection and should therefore be used in combination with another selector.",
        fn: shuffle,
        params: []
    },
    RANDOM: {
        name: "Random",
        description: "Returns a fresh, random population. Used as reference.",
        fn: randomPopulation,
        params: []
    },
    ROULETTE_WHEEL: {
        name: "Roulette Wheel Selection",
        description: "Creates a new population with members randomly selected from input based on their fitness.",
        fn: rouletteWheel,
        params: []
    },
    TOURNAMENT: {
        name: "Tournament selection",
        description: "Run (population size) tournaments among n chromosomes.",
        fn: tournament,
        params: [
            {
                name: "Tournament size",
                description: "Amount of chromosomes in each tournament.",
                type: 'uint',
                default: 2
            },
            {
                name: "Winning probability",
                description: "Probability for the fitter chromosome to win its tournament round.",
                type: 'float',
                range: [0,1],
                default: 0.9
            }

        ]
    },
    SUS: {
        name: "Stochastic universal sampling",
        description: "Creates a new population with members evenly selected from a random point.",
        fn: stochasticUniversalSampling,
        params: []
    }
};

export default parentSelectors;
