import genetic, {geneticOptions} from './genetic';

/**
 * Default, empty configuration.
 */
const globalConfiguration = {
    bitSize: 32,
    populationSize: 30,
    fn: Object.keys(geneticOptions.functions)[0],
    argRanges: genetic.functions[Object.keys(geneticOptions.functions)[0]].defaultRanges,
    evaluator: Object.keys(geneticOptions.evaluators)[0],
    initializer: Object.keys(geneticOptions.initializers)[0],
    locked: false,
  };
  
 export default {
    // If locked, global configuration cannot be edited.
    ui: {
      displayDrawer: false,
      viewMode: 'InstancesConfiguration',
      generations: 10,
      progress: null,
    },
    globalConfiguration: globalConfiguration,
    instanceConfigurations: [],
    currentGeneration: 0,
    data: [],
  };