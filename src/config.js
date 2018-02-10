import genetic, {geneticOptions} from './genetic';

/**
 * Default, empty configuration.
 */
const globalConfiguration = {
    bitSize: 32,
    populationSize: 1000,
    fn: 'ACKLEY',
    argRanges: genetic.functions['ACKLEY'].defaultRanges,
    evaluator: 'MIN',
    initializer: 'RANDOM_GLOBAL',
    rounds: 1,
    locked: false,
  };
  
 export default {
    // If locked, global configuration cannot be edited.
    ui: {
      displayDrawer: false,
      viewMode: 'InstancesConfiguration',
      generations: 10,
      progress: null,
      chartKey: 'bestSolution',
      chartKeys: {
        bestSolution: true,
        worstSolution: false,
        averageFitness: false,
      }
    },
    globalConfiguration: globalConfiguration,
    instanceConfigurations: [],
    currentGeneration: 0,
    data: [],
  };