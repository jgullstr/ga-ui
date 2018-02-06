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
    return funcs.reduce((a, b) =>
        function (...args) {
            return b.call(this, a.apply(this, args));
        }
    );
}

/**
 * Load functions from stage in instance configuration.
 */
const loadFunctions = (bitSize) => (stage, config) => {
    const functionArray = config[stage].map(partial => genetic[stage][partial.fn].fn(bitSize)(...partial.params));
    return functionArray.length ? functionArray : [x => x];
}

/**
 * Create composed function from instance configuration object.
 */
const composeStage = (loader) => (stage, config) => compose(loader(stage, config));

const instanceClassFactory = (globalConfiguration) => {

    // Global configuration is common between instances.
    const fn = genetic.functions[globalConfiguration.fn].fn;
    const codec = new genetic.codecs.BIN32.class(globalConfiguration.argRanges, null, globalConfiguration.bitSize); // Only binary codec supported atm.
    const evaluator = genetic.evaluators[globalConfiguration.evaluator].fn;
    const initializer = genetic.initializers[globalConfiguration.initializer].fn;
    const populationSize = globalConfiguration.populationSize;
    const loader = loadFunctions(globalConfiguration.bitSize);
    const composer = composeStage(loader);

    const Instance = class {
        constructor(instanceConfiguration) {
            this.population = new bin32Population(populationSize, fn, codec, evaluator, initializer);
            this.generation = 0;

            const recombiners = loader('recombiners', instanceConfiguration);
            
            const mutate = composer('mutators', instanceConfiguration);
            const selectSurvivors = composer('survivorSelectors', instanceConfiguration);
            const selectParents = composer('parentSelectors', instanceConfiguration);

            const evolver = evolve(selectParents)(recombiners)(mutate)(selectSurvivors);
            this.evolve = () => { this.population = evolver(this.population) };
        }

        getData() {
            return {
                bestSolution: this.population.bestSolution(),
                worstSolution: this.population.worstSolution(),
                averageFitness: this.population.averageFitness(),
                executionTime: this.population.executionTime,
            }
        }
    }
    return Instance;
}

// Container for instance solvers.
let roundInstances;
let Instance;

const geneticMiddleware = store => next => action => {
    // Actions in "GENETIC*" namespace are handled solely by this middleware.
    if (!action.type.startsWith("GENETIC")) {
        return next(action);   
    }

    const state = store.getState();
    const rounds = parseInt(state.globalConfiguration.rounds);

    // Evolve instances. Using timeout to not freeze ui and update progress.
    const execute = (instanceKeys, generations, current = 0, step = false, counter = 0, result = false) => {
        if (!step) {
            // How many generations needed for one percent progress increment.
            step = Math.ceil(generations / 100);
        }
        if (!result) {
            // Todo: Slice 3 dimensions.
            result = store.getState().data.map(roundData => roundData.map(instanceData => instanceData ? instanceData.map(x => x) : false));
        }
        if (counter++ === step) {
            counter = 0;
            store.dispatch(setProgress(Math.round(current / generations * 100)));
        }
        // Evolve all rounds of locked instances.
        roundInstances.map((instances, round) => instanceKeys.map((index) => {
            instances[index].evolve();
            return result[round][index].push(instances[index].getData());
        }));

        if (++current < generations) {
            setTimeout(execute, 10, instanceKeys, generations, current, step, counter, result);
        }
        else {
            // Update state and clear progress.
            store.dispatch(setInstanceData(result));
            store.dispatch(setProgress(null));
        }
    }

    const activeKeys = () => state.instanceConfigurations.reduce((result, config, index) => {
        return config.locked ? [...result, index] : result;
    }, []);

    switch (action.type) {
        // Lock global configuration, initialize solver.
        case "GENETIC_RESET":
            // Set generation to zero and passthrough to GENETIC_GLOBAL_LOCK.
            store.dispatch(setGeneration(0));
        case "GENETIC_GLOBAL_LOCK":
            Instance = instanceClassFactory(state.globalConfiguration);
            const data = Array(rounds).fill([]);
            store.dispatch(setInstanceData(data));
            roundInstances = data.map((value, round) => state.instanceConfigurations.map((config, index) => {
                const instance = new Instance(config);
                // Set initial data.
                store.dispatch(setInstanceData(config.locked ? [instance.getData()] : false, [round, index]));
                return config.locked ? instance : false;
            }));

            // Bring up to current generation.
            const currentGeneration = store.getState().currentGeneration;
            if (currentGeneration > 0) {
                execute(activeKeys(), currentGeneration);
            }
            store.dispatch(setGlobalLock(true));
            break;
        // Clear all data.
        case "GENETIC_GLOBAL_RESET":
            roundInstances = [];
            store.dispatch(clearData());
            store.dispatch(setGlobalLock(false));
            break;
        // Lock instance, evolve to current generation.
        case "GENETIC_INSTANCE_ADD":
            store.dispatch(addInstance(action.payload));
            roundInstances.map((instances, round) => {
                store.dispatch(setInstanceData(false, [round, state.data[round].length]));
                return instances.push(false);
            });
            break;
        // Delete instance.
        case "GENETIC_INSTANCE_DELETE":
            roundInstances.map((instances, round) => {
                instances.filter((v, i) => i !== action.payload);
                store.dispatch(deleteInstance(action.payload));
            });
            break;
        case "GENETIC_INSTANCE_TOGGLE_LOCK":
            const config = state.instanceConfigurations[action.payload.index];
            const locked = action.payload.locked;
            const index = action.payload.index;

            if (locked) {    
                roundInstances.map((instances, round) => {
                    const instance = new Instance(config);
                    instances[index] = instance;
                    // Add initial data to store.
                    store.dispatch(setInstanceData([instance.getData()], [round, index]));
                });
                // Bring instances up to current generation.
                const generations = parseInt(state.currentGeneration, 10);
                if (generations > 0) {
                    execute([index], generations);
                }
            }
            else {
                roundInstances.map((instances, round) => {
                    // Unlock --> clear instance data.
                    instances[index] = false;
                    store.dispatch(setInstanceData(false, [round, index]));
                });
            }
            // Toggle lock.
            store.dispatch(updateInstance({locked: locked}, [action.payload.index]));
            break;
        // Evolve all instances.
        case "GENETIC_EVOLVE":
            // How many generations to evolve.
            const generations = parseInt(state.ui.generations, 10);

            // Update current generation.
            execute(activeKeys(), generations);
            const finalGeneration = parseInt(state.currentGeneration, 10) + generations;
            store.dispatch(setGeneration(finalGeneration));
            break;
        default:
            throw new TypeError(`Unknown action type: ${action.type}.`);
    }
}

export default geneticMiddleware;