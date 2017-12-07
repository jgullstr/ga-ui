import { Component, Children, cloneElement } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { bin32Population } from '../../genetic/populations';
import { bin32Codec } from '../../genetic/codecs';

import library from '../../genetic';
import evolve from '../../genetic/evolve';
import functions from '../../functions';
import rebuilt from '../../store/actions/rebuilt';
import saveData from '../../store/actions/saveData';
import setGlobalConfig from '../../store/actions/setGlobalConfig';
// import initInstance from '../../store/actions/initInstance';
// import evolve from '../../store/actions/evolve';

const getOptions = (obj) => {
    const newObj = {};
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key].name;
        }
    }
    return newObj;
}

const getParams = (obj) => {
    const newObj = {};
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key].hasOwnProperty('params') ? obj[key].params : [];
        }
    }
    return newObj;
}

class Genetic extends Component {
    constructor(props, context) {
        super(props, context)
        this.library = library;
        this.functions = functions;
        this.state = {};

        this.options = {
            initializers: getOptions(library.initializers),
            parentSelectors: getOptions(library.parentSelectors),
            recombiners: getOptions(library.recombiners),
            mutators: getOptions(library.mutators),
            survivorSelectors: getOptions(library.survivorSelectors),
            evaluators: getOptions(library.evaluators),
            functions: getOptions(functions),
        }

        this.params = {
            initializers: getParams(library.initializers),
            parentSelectors: getParams(library.parentSelectors),
            recombiners: getParams(library.recombiners),
            mutators: getParams(library.mutators),
            survivorSelectors: getParams(library.survivorSelectors),
            evaluators: getParams(library.evaluators),
            functions: getParams(functions),
        }

        if (typeof(this.global) === 'undefined') {
            const globalConfiguration = {
                bitSize: 32,
                populationSize: 30,
                fn: Object.keys(this.options.functions)[0],
                argRanges: this.functions[Object.keys(this.options.functions)[0]].defaultRanges,
                evaluator: Object.keys(this.options.evaluators)[0],
                initializer: Object.keys(this.options.initializers)[0],
                locked: false,
                rebuild: false,
            };
            this.props.setGlobalConfig(globalConfiguration);
        }
        else {
            // TODO: Set default state.
        }
    }

    componentWillReceiveProps(nextProps) {
        // Trigger a global rebuild. Resets all progress.
        if (nextProps.global.rebuild) {
            const config = this.rebuildConfig(nextProps);
            const populations = this.rebuildPopulations(nextProps, config);
            //const instanceEvolvers = this.rebuildInstanceEvolvers(nextProps, true);
            const instanceEvolvers = [];

            this.setState({
                ...config,
                populations: populations,
                instanceEvolvers: instanceEvolvers
            });

            // Trigger rebuilt action.
            return this.props.rebuilt();
        }
        
        // If configurations have been added / removed.
        const instanceKeys = nextProps.instances.reduce((result, instance, i) => {
            if (typeof(instance) === "undefined") {
                return result;
            }
            return [...result, i];
        },[]);

        const generation = nextProps.generation;

        // Instances have been modified.
        if (instanceKeys !== this.props.instances.keys()) {

        }

        if (this.props.generation < nextProps.generations) {
            // Foreach locked instance, bring its corresponding data up to next generation.

        }
    }


    rebuildConfig(props) {
        return {
            codec: new bin32Codec(this.functions[props.global.fn].defaultRanges, null, props.global.bitSize),
            fn: this.functions[props.global.fn].fn,
            initializer: this.library.initializers[props.global.initializer].fn,
            evaluator: this.library.evaluators[props.global.evaluator].fn,
        };
    }

    rebuildPopulations(props, config) {
        return props.instances.map(({populationSize}) => {
            return new bin32Population(populationSize, config.fn, config.codec, config.evaluator, config.initializer);
        });
    }

    rebuildInstanceEvolvers(props, force = false) {
        return props.instances.map((instanceConfig, i) => {
            if (instanceConfig.rebuild || force) {
                // Reverse composition?
                const parentSelector = compose(
                    ...instanceConfig.parentSelectors.map(
                        ({name, params}) => this.library.parentSelectors[i].fn
                    )
                );
                const recombiner = compose(
                    ...instanceConfig.recombiners.map(
                        ({name, params}) => this.library.recombiners[name].fn(params)
                    )
                );
                const mutator = compose(
                    ...instanceConfig.mutators.map(
                        ({name, params}) => this.library.mutators[name].fn(...params)
                    )
                );
                const survivorSelector = compose(
                    ...instanceConfig.survivorSelectors.map(
                        ({name, params}) => this.library.survivorSelectors[i].fn
                    )
                );
                return evolve(parentSelector)(recombiner)(mutator)(survivorSelector);
            }
            return this.state.instanceEvolvers[i];
        });
    }

    render() {
        return typeof(this.props.global) === 'undefined' ? null : Children.map(this.props.children,
            (child) => cloneElement(child, {
                options: this.options,
                params: this.params,
            })
        );
    }
}

const mapStateToProps = (state) => ({
    global: state.globalConfiguration,
    instances: state.instanceConfigurations,
    rebuild: state.rebuild,
    evolve: state.evolve
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({rebuilt: rebuilt, saveData: saveData, setGlobalConfig: setGlobalConfig}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Genetic);