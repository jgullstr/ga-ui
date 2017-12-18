import { bin32Population } from './populations';
import { bin32Codec } from './codecs';

import genetic from '.';
import evolve from './evolve';

/**
 * Compose array of functions from left to right.
 * @param {Array} funcs 
 */
const compose = (funcs) => {
    if (funcs.length === 0) {
        return arg => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => b(a(...args)));
}

class Solver {
    constructor(chromosomeSize, populationSize, functionName, evaluatorName, initializerName) {
        this.codec = new bin32Codec(functions[functionName].defaultRanges, null, this.global.bitSize);
        this.populationSize = populationSize;
        this.evaluator = evaluators[evaluatorName].fn;
        this.initializer = initializers[initializerName].fn;
        this.fn = functions[functionName].fn;
        this.populations = [];
        this.instances = [];
        this.evolvers = [];
        this.generation = 0;
    }

    addPopulation() {
        this.populations.push(new bin32Population(this.populationSize, this.fn, this.codec, this.evaluator, this.initializer));
    }

    composeStage(instance, stage) {
        return compose(instance[stage].map(
            ({name, params}) => this.library[stage][name].fn(params)
        ));
    }

    initPopulations() {
        this.populations = this.instances.map((config) => {
            return this.initPopulation(this.populationSize);
        });
    }



    rebuildInstances(force = false) {
        this.instances = this.instances.map((instanceConfig, index) => {
            if (instanceConfig.rebuild || force) {
                return this.buildInstance(index);
            }
            return this.instances[index];
        });
    }

    addInstance(config) {
        const index = this.instances.push(config) - 1;
        this.buildInstance(index);
        this.populations.push(this.initPopulation(config.populationSize));
        this.evolve();
    }

    evolve() {
        this.instances
    }

    buildInstance(index) {
        // Reverse composition?
        const instance = this.instances[index];
        const parentSelector = this.composeStage(instance, 'parentSelectors');
        const recombiner = this.composeStage(instance, 'recombiners');
        const mutator = this.composeStage(instance, 'mutators');
        const survivorSelector = this.composeStage(instance, 'survivorSelectors');
        return evolve(parentSelector)(recombiner)(mutator)(survivorSelector);
    }
}