import genetic from '../../genetic';
import evolve from '../../genetic/evolve';
import { bin32Population } from '../../genetic/populations';

import setGlobalLock from '../actions/setGlobalLock';
import setGeneration from '../actions/setGeneration';
import addInstance from '../actions/addInstance';
import updateInstance from '../actions/updateInstance';
import deleteInstance from '../actions/deleteInstance';
import setInstanceData from '../actions/setInstanceData';
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

// Container for instance solvers.
let instances = [];
let Instance;

const geneticMiddleware = store => next => action => {
    // Actions in "GENETIC*" namespace are handled solely by this middleware.
    if (!action.type.startsWith("GENETIC")) {
        return next(action);   
    }

    const state = store.getState();

    switch (action.type) {
        // Lock global configuration, initialize solver.
        case "GENETIC_GLOBAL_LOCK":
            Instance = instanceClassFactory(state.globalConfiguration);
            instances = state.instanceConfigurations.map(config => {
                return config.locked ? new Instance(config) : false;
            })
            store.dispatch(setGlobalLock(true));
            break;
        // Clear all data.
        case "GENETIC_GLOBAL_RESET":
            instances = [];
            store.dispatch(clearData());
            store.dispatch(setGlobalLock(false));
            break;
        // Lock instance, evolve to current generation.
        case "GENETIC_INSTANCE_ADD":
            store.dispatch(addInstance(action.payload));
            store.dispatch(setInstanceData([], [state.data.length]));
            instances.push([]);
            break;
        // Delete instance.
        case "GENETIC_INSTANCE_DELETE":
            instances.filter((v, i) => i !== action.payload);
            store.dispatch(deleteInstance(action.payload));
            break;
        case "GENETIC_INSTANCE_TOGGLE_LOCK":
            const config = state.instanceConfigurations[action.payload.index];
            const locked = action.payload.locked;
            const index = action.payload.index;
            const data = [];

            if (locked) {
                const instance = new Instance(config);
                instances[index] = instance;
                // Bring instance up to current generation.
                let generation = parseInt(state.currentGeneration);
                data.push(instance.getData());
                let counter = 0;
                const step = Math.ceil(generation / 100);
                while (generation--) {
                    instance.evolve();
                    data.push(instance.getData());
                    if (counter++ === step) {
                        counter = 0;
                        store.dispatch(setProgress(Math.round((state.currentGeneration - generation)/ state.currentGeneration * 100)));
                    }
                }
                store.dispatch(setProgress(null));
            }
            else {
                instances[index] = false;
            }
            store.dispatch(setInstanceData(data, [index]));
            store.dispatch(updateInstance({locked: locked}, [action.payload.index]));
            break;
        // Evolve all instances.
        case "GENETIC_EVOLVE":
            // How many generations to evolve.
            const generations = parseInt(state.ui.generations);

            // How many generations needed for one percent progress increment.
            const step = Math.ceil(generations / 100);
            const finalGeneration = parseInt(state.currentGeneration) + generations;

            let result = [];
            let current = 0;
            let counter = 0;

            while (current++ < generations) {
                if (counter++ === step) {
                    counter = 0;
                    store.dispatch(setProgress(Math.round(current / generations * 100)));
                }
                // Evolve all locked instances.
            }

            // Update state and clear progress.
            store.dispatch(setGeneration(finalGeneration))
            store.dispatch(setProgress(null));
    }
}

export default geneticMiddleware;