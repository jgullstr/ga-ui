import {bin32Codec} from './codec';
import {evolve} from './evolve';
import {minValue, maxValue} from './fitness';
import {mutateRandom} from './mutation';
import {bin32Population} from './population';
import {crossoverSinglePoint, crossoverNPoints, crossoverUniform, menageATrois} from './recombination'
import {rouletteWheel} from './parentselection'

const identity = {
    name: "Identity function",
    description: "Returns unaltered value(s).",
    params: [],
    function: x => x
}

const codecs = [
    {
        name: "Real to binary",
        description: "Maps range of real values into binary values.",
        class: bin32Codec,
        params: []
    }
];

const populations = [
    {
        name: "Binary population",
        description: "Operates on binary values.",
        class: bin32Population,
        params: [
            {
                name: "Bit length",
                description: "Amount of bits (1-32) in each chromosome.",
                type: 'int',
                range: [1,32]
            }
        ]
    }
];

const parentSelectors = [
    {
        name: "Roulette Wheel Selection",
        description: "Creates a new population with members randomly selected from input based on their fitness.",
        function: rouletteWheel,
        params: []
    },
    identity
];

const recombinators = [
    {
        name: "Single point crossover",
        description: "Swap tails of parents at a random point.",
        function: crossoverSinglePoint,
        params: []
    },
    {
        name: "N-point crossover",
        description: "Swap tails of parents at a random index n times with probability p.",
        function: crossoverNPoints,
        params: [
            {
                name: "Points",
                description: "Amount of swaps.",
                type: 'int'
            },
            {
                name: "Probability",
                description: "Probability for a single mutation.",
                type: 'float',
                range: [0,1]
            }
        ]
    },
    {
        name: "Uniform crossover",
        description: "Swap each allele between parents with 50% probability.",
        function: crossoverUniform,
        params: [
            {
                name: "Points",
                description: "Amount of swaps.",
                type: 'int'
            },
            {
                name: "Probability",
                description: "Probability for a single mutation.",
                type: 'float',
                range: [0,1]
            }
        ]
    },
    {
        name: "Three-parent crossover",
        description: "(Experimental) Uniform crossover between each parent and common alleles between the remaining two.",
        function: menageATrois,
        params: []
    },
    identity
];

const mutators = [
    {
        name: "Random mutation",
        description: "Flip each allele with a probability p.",
        function: mutateRandom,
        params: [
            {
                name: "Probability",
                description: "Probability for a single mutation.",
                type: 'float',
                range: [0,1]
            }
        ]
    },
    identity
];

const survivorSelectors = [
    identity
];

const evaluators = [
    {
        name: 'Maximize',
        description: 'Find maximum value.',
        function: x => x,
    },
    {
        name: 'Minimize',
        description: 'Find minimum value.',
        function: x => -x,
    }
];

const initializers = [
    {
        name: 'Random (global)',
    },
    {
        name: 'Random (per instance)',
    },
]

const genetic = {
    codecs: codecs,
    populations: populations,
    parentSelectors: parentSelectors,
    recombinators: recombinators,
    mutators: mutators,
    survivorSelectors: survivorSelectors,
    evaluators: evaluators,
    initializers: initializers
};

export default genetic;