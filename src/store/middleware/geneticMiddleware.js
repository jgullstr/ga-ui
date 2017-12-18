import initGlobal from '../actions/initGlobal';
import resetGlobal from '../actions/resetGlobal';

const geneticMiddleware = store => next => action => {
    if (!action.type.startsWith("GENETIC")) {
        return next(action);   
    }

    switch (action.type) {
        // Lock global configuration, initialize solver.
        case "GENETIC_GLOBAL_LOCK":
            store.dispatch(initGlobal());
            break;
        // Clear all data.
        case "GENETIC_GLOBAL_RESET":
            break;
        // Lock instance, evolve to current generation.
        case "GENETIC_INSTANCE_LOCK":
            break;
        // Clear instance data.
        case "GENETIC_INSTANCE_UNLOCK":
            break;
        // Delete instance.
        case "GENETIC_INSTANCE_DELETE":
            break;
        // Evolve all instances
        case "GENETIC_EVOLVE":
            break;
    }
}

export default geneticMiddleware;