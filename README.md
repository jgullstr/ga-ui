# [Genetic algorithm evaluator](https://jgullstr.github.io/ga-ui)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jgullstr/ga-ui/blob/master/LICENSE)

User interface for evaluating performance of generational evolutionary algorithm configurations.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Scope](#scope)
- [Configuration](#configuration)
  - [Global Configuration](#global-configuration)
  - [Instance Configuration](#instance-configuration)
    - [Parent selection](#parent-selection)
    - [Recombination](#recombination)
    - [Mutation](#mutation)
    - [Survivor selection](#survivor-selection)
- [Execution](#execution)
- [Evaluation](#evaluation)

## Scope

Visualization of value optimization in different 4-stage (generational) evolutionary algoritms.

## Configuration

Configuration is done in two stages: Global and by instance. The global configuration is shared between all instances, whose stages are configured independently.

### Global configuration

The global configuration is opened at application launch, and is later accessed from the top left hamburger icon. The solution space is defined by amount of bits in each chromosome (2^n possible solutions).

If amount of rounds is set to n > 1, the result will be displayed as average values over n rounds. n > 1 will not produce numerical solutions, as produced data is aggregate.

When configured, the global configuration needs to be initialized in order to access instance configurations. Resetting the global configuration clears all calculated data, and a subsequent reinitialization triggers a recalculation.

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
