import { bin32Population } from '../../genetic/populations';
import { bin32Codec } from '../../genetic/codecs';

import library from '../../genetic';
import evolve from '../../genetic/evolve';
import functions from '../../functions';
import rebuilt from '../../store/actions/rebuilt';

import codecs from './codecs';
import evaluators from './evaluators';
import initializers from './initializers';
import mutators from './mutators';
import populations from './populations';
import recombiners from './recombiners';
import parentSelectors from './parentSelectors';
import survivorSelectors from './survivorSelectors';

/**
 * Compose array of functions from left to right.
 * @param {Array} funcs 
 */
const ltrCompose = (funcs) => {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => b(a(...args)))
}


const genetic = {
    codecs: codecs,
    populations: populations,
    initializers: initializers,
    parentSelectors: {...parentSelectors, IDENTITY: identity},
    recombiners: {...recombiners, IDENTITY: identity},
    mutators: {...mutators, IDENTITY: identity},
    survivorSelectors: {...survivorSelectors, IDENTITY: identity},
    evaluators: evaluators,
};

export default genetic;

const defaultGlobal = {
    bitSize: 32,
    fn: Object.keys(this.options.functions)[0],
    argRanges: this.functions[Object.keys(this.options.functions)[0]].defaultRanges,
    evaluator: Object.keys(this.options.evaluators)[0],
    initializer: Object.keys(this.options.initializers)[0],
    locked: false,
    rebuild: false,
};

const defaultInstance = {

}

class Solver {
    constructor() {
        this.populations = [];
        this.instances = [];
        this.evolvers = [];
        this.generation = 0;
    }

    composeStage(instance, stage) {
        return ltrCompose(instance[stage].map(
            ({name, params}) => this.library[stage][name].fn(params)
        ));
    }

    init() {
        this.codec = new bin32Codec(functions[this.global.fn].defaultRanges, null, this.global.bitSize);
        this.fn = functions[this.global.fn].fn;
        this.initializer = library.initializers[this.global.initializer].fn;
        this.evaluator = library.evaluators[this.global.evaluator].fn;
    }

    initPopulations() {
        this.populations = this.instances.map((config) => {
            return this.initPopulation(config.populationSize);
        });
    }

    initPopulation(size) {
        return new bin32Population(size, this.fn, this.codec, this.evaluator, this.initializer);
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