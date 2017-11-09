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

        if (typeof(this.global) === 'undefined') {
            const globalConfiguration = {
                bitSize: 32,
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
            const instanceEvolvers = this.rebuildInstanceEvolvers(nextProps, true);

            this.setState({
                ...config,
                populations: populations,
                instanceEvolvers: instanceEvolvers
            });

            // Trigger rebuilt
            this.props.rebuilt();
        }
        // Check for instance rebuilds.
        else {

        }
        // 
        /*if (this.props.instanceEvolvers.length != nextProps.instances.length) {

        }

        if (nextProps.generations) {

        }*/
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
                const selectParents = compose(...instanceConfig.selectParents.map((i) => this.library.selectParents[i].fn))
                const recombine = compose(...instanceConfig.recombine.map((i) => this.library.recombine[i].fn))
                const mutate = compose(...instanceConfig.mutate.map((i) => this.library.mutate[i].fn))
                const selectSurvivors = compose(...instanceConfig.selectSurvivors.map((i) => this.library.selectSurvivors[i].fn))
                return evolve(selectParents)(recombine)(mutate)(selectSurvivors);
            }
            return this.state.instanceEvolvers[i];
        });
    }

    render() {
        return typeof(this.props.global) === 'undefined' ? null : Children.map(this.props.children,
            (child) => cloneElement(child, {
                options: this.options
            })
        );
    }
}

const mapStateToProps = (state) => ({
    global: state.globalConfiguration,
    instances: state.instanceConfiguration,
    rebuild: state.rebuild,
    evolve: state.evolve
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({rebuilt: rebuilt, saveData: saveData, setGlobalConfig: setGlobalConfig}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Genetic);