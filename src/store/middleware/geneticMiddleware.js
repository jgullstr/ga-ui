import genetic from '../../genetic';
import evolve from '../../genetic/evolve';
import { bin32Population } from '../../genetic/populations';

import setGlobalLock from '../actions/setGlobalLock';
import setGeneration from '../actions/setGeneration';
import updateInstance from '../actions/updateInstance';
import deleteInstance from '../actions/deleteInstance';
import setProgress from '../actions/setProgress';
import clearData from '../actions/clearData';

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

const composeStage = (bitSize) => (stage, config) => {
    return compose(config[stage].map(partial => genetic[stage][partial.fn].fn(bitSize)(...partial.params)));
}

const instanceClassFactory = (globalConfiguration) => {

    // Global configuration is common between instances.
    const fn = genetic.functions[globalConfiguration.fn].fn;
    const codec = new genetic.codecs.BIN32.class(globalConfiguration.argRanges, null, globalConfiguration.bitSize); // Only binary codec supported atm.
    const evaluator = genetic.evaluators[globalConfiguration.evaluator].fn;
    const initializer = genetic.initializers[globalConfiguration.initializer].fn;
    const populationSize = globalConfiguration.populationSize;
    const composer = composeStage(globalConfiguration.bitSize);
    const Population = bin32Population;

    const Instance = class {
        constructor(instanceConfiguration) {
            this.population = new bin32Population(populationSize, fn, codec, evaluator, initializer);
            this.generation = 0;

            const recombine = composer('recombiners', instanceConfiguration);
            const mutate = composer('mutators', instanceConfiguration);
            const selectSurvivors = composer('survivorSelectors', instanceConfiguration);
            const selectParents = composer('parentSelectors', instanceConfiguration);

            const evolver = evolve(selectParents)(recombine)(mutate)(selectSurvivors);
            this.evolve = () => { this.population = evolver(this.population) };
        }

        getData() {
            return {
                bestSolution: this.population.bestSolution(),
                averageFitness: this.population.averageFitness(),
                executionTime: this.population.executionTime,
            }
        }
    }
    return Instance;
}

// Container for each instance solver.
let instances = [];
let Instance;

const geneticMiddleware = store => next => action => {
    if (!action.type.startsWith("GENETIC")) {
        return next(action);   
    }

    const state = store.getState();

    switch (action.type) {
        // Lock global configuration, initialize solver.
        case "GENETIC_GLOBAL_LOCK":
            Instance = instanceClassFactory(state.globalConfiguration);
            console.log(Instance);
            store.dispatch(setGlobalLock(true));
            break;
        // Clear all data.
        case "GENETIC_GLOBAL_RESET":
            store.dispatch(setGlobalLock(false));
            break;
        // Lock instance, evolve to current generation.
        case "GENETIC_INSTANCE_TOGGLE_LOCK":
            const config = state.instanceConfigurations[action.payload.index];
            instances.push(new Instance(config));
            console.log(instances[0].getData());
            instances[0].evolve();
            console.log(instances[0].getData());
            store.dispatch(updateInstance({locked: action.payload.locked}, [action.payload.index]))
            break;
        // Clear instance data.
        case "GENETIC_INSTANCE_UNLOCK":
            store.dispatch(updateInstance({locked: false}, [action.payload]))
            break;
        // Delete instance.
        case "GENETIC_INSTANCE_DELETE":
            store.dispatch(deleteInstance(action.payload));
            break;
        // Evolve all instances
        case "GENETIC_EVOLVE":
            const currentGeneration = state.currentGeneration;
            const totalGenerations = parseInt(state.ui.generations)
            let generations = totalGenerations;
            const countdown = setInterval(function(){
              store.dispatch(setProgress(Math.round((totalGenerations - generations) / totalGenerations * 100)));
              if (--generations === 0) {
                store.dispatch(setGeneration(currentGeneration + totalGenerations))
                store.dispatch(setProgress(null));
                clearInterval(countdown);
              }
            }, 50);
            break;
    }
}

export default geneticMiddleware;