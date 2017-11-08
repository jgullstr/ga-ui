import {randomReal} from './random';

/**
 * Roulette wheel selection.
 * 
 * Create a new, same-size population with members selected at a probability 
 * proportionate to their fitness.
 * 
 * @param  {Population} population
 * @return {Population} Fitness-biased population for recombination.
 */
export const rouletteWheel = population => {
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


const parentSelectors = [
    {
        name: "Roulette Wheel Selection",
        description: "Creates a new population with members randomly selected from input based on their fitness.",
        fn: rouletteWheel,
        params: []
    }
];

export default parentSelectors;