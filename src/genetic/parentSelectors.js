import {randomReal} from './random';

const loadBalancedFitnesses = (population) => {
    let totalFitness = population.totalFitness();
    let fitnessValues = population.fitnesses();
    
    const minFitness = Math.min(...fitnessValues);

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
    console.log(newValues.length);
    console.log(population.size);
    return population.fromArray(newValues);
};


const parentSelectors = {
    ROULETTE_WHEEL: {
        name: "Roulette Wheel Selection",
        description: "Creates a new population with members randomly selected from input based on their fitness.",
        fn: rouletteWheel,
        params: []
    },
    SUS: {
        name: "Stochastic universal sampling",
        description: "Creates a new population with members evenly selected from a random point.",
        fn: stochasticUniversalSampling,
        params: []
    }
};

export default parentSelectors;
