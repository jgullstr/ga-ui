# [Genetic algorithm evaluator](https://jgullstr.github.io/ga-ui)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jgullstr/ga-ui/blob/master/LICENSE)

User interface for evaluating performance of generational evolutionary algorithm configurations.

## Table of Contents

- [Scope](#scope)
- [Configuration](#configuration)
  - [Global Configuration](#global-configuration)
    - [Available functions](#available-functions)
  - [Instance Configuration](#instance-configuration)
    - [Parent selection](#parent-selection)
    - [Recombination](#recombination)
    - [Mutation](#mutation)
    - [Survivor selection](#survivor-selection)
- [Execution](#execution)
- [Evaluation](#evaluation)
- [Extend](#extend)
  - [Functions](#functions)
  - [Parent selectors](#parent-selectors)
  - [Recombiners](#recombiners)
  - [Mutators](#mutators)
  - [Survivor selectors](#survivor-selectors)

## Scope

Visualization of value optimization in different 4-stage (generational) evolutionary algoritms.

## Configuration

Configuration is done in two stages: Global and by instance. The global configuration is shared between all instances, whose stages are configured independently.

### Global configuration

The global configuration is opened at application launch, and is later accessed from the top left hamburger icon. The solution space is defined by amount of bits in each chromosome (2^n possible solutions).

If amount of rounds is set to n > 1, the result will be displayed as average values over n rounds. n > 1 will not produce numerical solutions, as produced data is aggregate.

When configured, the global configuration needs to be initialized in order to access instance configurations. Resetting the global configuration clears all calculated data, and a subsequent reinitialization triggers a recalculation.

#### Available functions
Optimization problems and search ranges currently included in the application are:
- F1 (-20 <= x <= 20), F7 (0 <= x, y <= 10), F8 (0 <= x, y <= 10), and F16 (-20 <= x, y <= 20) are functions taken from Haupt, Randy L., and Sue Ellen Haupt. Practical genetic algorithms. John Wiley & Sons, 2004.
- Square and cube are f(x) = x^2 and f(x) = x^3, respectively, both in range -20 <= x <= 20
- [Ackley's function](https://en.wikipedia.org/wiki/Test_functions_for_optimization), -5.12 <= x,y <= 5.12
- [Hölder table function](https://en.wikipedia.org/wiki/Test_functions_for_optimization), -10 <= x,y <= 10
- [Himmelblau's function](https://en.wikipedia.org/wiki/Himmelblau%27s_function), -5 <= x,y <= 5
- [SAS](http://support.sas.com/documentation/cdl/en/ormpug/66851/HTML/default/viewer.htm#ormpug_nlpsolver_gettingstarted03.htm), -1 <= x,y <= 1

### Instance configuration

Create a new empty instance by clicking the "+" icon. Each instance is comprised of 4 stages: Parent selection, recombination, mutation and survivor selection. These stages determine how the instance will produce the next generation.

When stages are configured, the instance needs to be locked to be included in the result.

#### Parent selection
The parent selection stage operates on the current population and returns a mating pool, a new population with same size containing members selected from the input population. Currently included parent selectors are:

- Shuffle: Shuffles the chromosomes in the population. Should be used in conjunction with another parent selector, as its produced mating pool contains identical values to input.
- [Roulette wheel selection](https://en.wikipedia.org/wiki/Fitness_proportionate_selection)
- [Stochastic universal sampling](https://en.wikipedia.org/wiki/Stochastic_universal_sampling)
- [Tournament selection](https://en.wikipedia.org/wiki/Tournament_selection)

#### Recombination
A recombination function produces a new same-size population by sequentially combining n parents from the mating pool into n offspring. Available recombination functions are:

- Single point crossover. Picks a random point p < chromosome bitlength, and swaps the "tails" of two parents at p.
- N-point crossover. Does N single point crossovers, each with a configurable probability p.
- Uniform crossover. Produces two offspring by randomly swapping each allele between parents.
- Three-parent crossover. Pointless experiment with three parents.

#### Mutation
Mutation functions work on individual bits in each recombined offspring. Available mutators are:

- Random mutation. Flips each allele (bit) with a probability p.
- Linear inbreeding depression. Flips each allele with a probability p in range [pMin, pMax], proportional to the distance between the parent chromosomes' distance (= (maxParent - minParent) / maxValue) in the solution space (p = pMin + distance*(pMax - pMin)).
- Exponential inbreeding depression. Flips each allele with a probability range [pMin, pMax], proportional to the distance between the parent chromosomes' distance in the solution space (p = pMin + (pMax - pMin)*(1 - distance^exponent)).

#### Survivor selection
Survivor selection combines (unknown fitness) members from the freshly produced population with (known fitness) values from the parent population. The resulting population is passed as parents to the following iteration.

- Elitism. Preserve the best n parent chromosomes and discard as many children.

## Execution
When instances are configured and locked, the system is evolved by pressing the "Evolve" button. Progress can be cleared from the "Reset generations" option in the bottom left menu.

## Visualization
The output of the instances can be seen by pressing the upper right chart icon. Each instance is represented by a line in a chart, which can be toggled to show best value, worst value and average fitness for each generation.

## Extend
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Refer to the documentation of Create React App for build information.

To get a local copy running using [npm](https://www.npmjs.com/), simply clone this repository and run "npm install". Once install is completed, start a development server by running the command "npm start".

Most parts of the application are easy to extend, though some patterns used could be refined, especially ui-related components.

During execution, results of earlier stages are bound to operator functions further down the pipeline, should intermediary results be of interest to any operator (Keep best solution from current generation, for example). All operators can have an arbitrary amount of parameters, which can be configured from the interface.

### Functions
Functions can be found in the src/genetic/functions folder. If you add a new file containing functions, it will need to be imported into the index.js file of that folder. Functions are registered using registerFunction(). Currently, default ranges specified to this function are used during execution. The bits in a single chromosome are evenly distributed among the function arguments, so max amount of bits per argument is limited to 32 // argument count.

```es6
import { registerFunction } from './functionLibrary';

const himmelblau = (x,y) => Math.pow(Math.pow(x,2) + y - 11, 2) + Math.pow(x + Math.pow(y,2) - 7, 2)
registerFunction('HIMMELBLAU', {
    name: "Himmelblau's function",
    fn: himmelblau,
    defaultRanges: [[-5,5],[-5,5]],
    description: 'min: 0'
})
```

### Parent selectors
Parent selectors are defined in src/genetic/parentSelectors.js. A function retrieves a bin32Population object (found in src/genetic/populations.js) and returns a new bin32Population, the mating pool, whose members have been selected by the logic in the function. Refer to the existing parent selectors for code examples.

```es6
const functionName = bitSize => (...arguments) => function(population) {
  // Available context:
  // this.population: Same as population argument
}
```
Replace arguments with configurable parameters, e.g. for tournament selection:

```es6
const tournament = bitSize => (tournamentSize, p) => function(population) => {
  //...
}
```
Then add the new function along with parameter specification for configuration to appear in the interface, e.g.

```es6
{
  //...
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
    }
}
```

Following operators are defined in a similar manner, with additional context.

### Recombiners
Recombiners are defined in src/genetic/recombiners.js

A recombiner takes an arbitrary amount of parents from the mating pool and returns an array of same size containing recombined values.

```es6
const functionName = bitSize => (...arguments) => function(value1, value2, ..., valueN) {
  // Available context:
  // this.population: Unaltered population (indata to parent selector)
  // this.matingPool: Mating pool returned from parent selection stage
}
```
### Mutators
Mutators are defined in src/genetic/mutators.js

A mutator takes a single chromosome (32-bit integer) and returns its mutated value. Refer to the source for code examples. Similarily to other stages, metadata needs to be specified in the files default export.

```es6
const functionName = bitSize => (...arguments) => function(value) {
  // Available context:
  // this.population: Unaltered population (indata to parent selector)
  // this.matingPool: Mating pool returned from parent selection stage
  // this.parents: Array containing the parents selected during recombination.
  // this.childIndex: The first index of this chromosome's parents in this.parents
  //   How to determine parents when composed recombiners have been used are left as an excercise
  //   to the reader, hanc marginis exiguitas non caperet.
}
```

### Survivor selectors
Survivor selectors are defined in src/genetic/survivorSelectors.js

A survivor selectors takes the mutated population and returns a same size population to be considered when calculating following generation. Refer to the source for code examples. Similarily to other stages, metadata needs to be specified in the files default export.

```es6
const functionName = bitSize => (...arguments) => function(population) {
  // Available context:
  // this.population: Unaltered population (indata to parent selector)
  // this.matingPool: Mating pool returned from parent selection stage
  // this.parents: Array containing the chromosome's parents selected during recombination.
  // this.mutants: Array containing the chromosome's parents selected during recombination.
}
