import { randomPopulation } from './parentSelectors';

/**
 * Elitism.
 * 
 * @param {Integer} bitSize Amount of bits in value.
 * @returns {Function}
 * @note Needs to use "function" instead of arrow notation in order to access this context.
 */
export const elitism = (bitSize) => (n) => function (population) {
    const lastPopulation = this.population;
    const values = lastPopulation.chromosomes();

    const keepers = lastPopulation.fitnesses()
        // Create index/value tuples from fitnesses.
        .map((v,i) => ({index: i, value: v}))
        // Sort tuples descending by value.
        .sort((a,b) => b.value - a.value)
        // Slice n most fit parents.
        .slice(0, n)
        // Get values of sliced parents.
        .map((v) => values[v.index]);
    // Merge keepers with next generation sans n first chromosomes.
    const survivors = [...keepers, ...population.chromosomes().slice(n)];
    // Create new population from produced values.
    return population.fromArray(survivors);
};


const survivorSelectors = {
    ELITISM: {
        name: "Elitism",
        description: "Preserve n fittest chromosomes from previous generation, discarding first n chromosomes from children.",
        fn: elitism,
        params: [
            {
                name: "Amount",
                description: "Amount of parents to keep.",
                type: 'uint',
                default: 5
            },
        ]
    },
    RANDOM: {
        name: "Random",
        description: "Create a fresh array to start from in next iteration.",
        fn: randomPopulation,
        params: []
    },
};

export default survivorSelectors;