import setGlobalLock from '../actions/setGlobalLock';
import setGeneration from '../actions/setGeneration';
import updateInstance from '../actions/updateInstance';
import deleteInstance from '../actions/deleteInstance';
import setProgress from '../actions/setProgress';
import clearData from '../actions/clearData';

const geneticMiddleware = store => next => action => {
    if (!action.type.startsWith("GENETIC")) {
        return next(action);   
    }

    const state = store.getState();

    switch (action.type) {
        // Lock global configuration, initialize solver.
        case "GENETIC_GLOBAL_LOCK":
            store.dispatch(setGlobalLock(true));
            break;
        // Clear all data.
        case "GENETIC_GLOBAL_RESET":
            store.dispatch(setGlobalLock(false));
            break;
        // Lock instance, evolve to current generation.
        case "GENETIC_INSTANCE_TOGGLE_LOCK":
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