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

/**
 * Create composed function from instance configuration object.
 * @param {*} bitSize 
 */
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

    // Evolve instances. Using timeout to not freeze ui and update progress.
    const execute = (instanceKeys, generations, current = 0, step = false, counter = 0, result = false) => {
        if (!step) {
            // How many generations needed for one percent progress increment.
            step = Math.ceil(generations / 100);
        }
        if (!result) {
            // Todo: Slice 2 dimensions.
            result = store.getState().data.slice();
        }
        if (counter++ === step) {
            counter = 0;
            store.dispatch(setProgress(Math.round(current / generations * 100)));
        }
        // Evolve all locked instances.
        instanceKeys.map((index) => {
            instances[index].evolve();
            return result[index].push(instances[index].getData());
        });

        if (++current < generations) {
            setTimeout(execute, 10, instanceKeys, generations, current, step, counter, result);
        }
        else {
            // Update state and clear progress.
            store.dispatch(setInstanceData(result));
            store.dispatch(setProgress(null));
        }
    }

    switch (action.type) {
        // Lock global configuration, initialize solver.
        case "GENETIC_GLOBAL_LOCK":
            Instance = instanceClassFactory(state.globalConfiguration);
            instances = state.instanceConfigurations.map(config => {
                return config.locked ? new Instance(config) : false;
            });
            // Recalculate instances.
            const activeKeys = instances.reduce((result, instance, index) => {
                if (instance) {
                   store.dispatch(setInstanceData([instance.getData()], [index]));
                   return [...result, index];
                }
                return result;
            }, []);

            // Bring up to current generation.
            execute(activeKeys, state.currentGeneration);
            
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
            instances.push(false);
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

            if (locked) {
                const instance = new Instance(config);
                instances[index] = instance;
                // Add initial data to store.
                store.dispatch(setInstanceData([instances[index].getData()], [index]));

                // Bring instance up to current generation.
                const generations = parseInt(state.currentGeneration, 10);
                if (generations > 0) {
                    execute([index], generations);
                }
            }
            else {
                // Unlock --> clear instance data.
                instances[index] = false;
                store.dispatch(setInstanceData([], [index]));
            }
            // Toggle lock.
            store.dispatch(updateInstance({locked: locked}, [action.payload.index]));
            break;
        // Evolve all instances.
        case "GENETIC_EVOLVE":
            // How many generations to evolve.
            const generations = parseInt(state.ui.generations, 10);

            const keys = instances.reduce((result, instance, index) => {
                return instance ? [...result, index] : result;
            }, []);

            // Update current generation.
            execute(keys, generations);
            const finalGeneration = parseInt(state.currentGeneration, 10) + generations;
            store.dispatch(setGeneration(finalGeneration));
            break;
        default:
            throw new TypeError(`Unknown action type: ${action.type}.`);
    }
}

export default geneticMiddleware;