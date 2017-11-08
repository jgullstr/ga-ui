import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { bin32Population } from '../../genetic/population';
import { bin32Codec } from '../../genetic/codec';
import { evolve } from '../../genetic/evolve';
 
import rebuilt from '../../store/actions/rebuilt';
import saveData from '../../store/actions/saveData';

import { compose } from 'redux'

// import initInstance from '../../store/actions/initInstance';

class Genetic extends Component {
    constructor(props, context) {
        super(props, context)
        this.library = props.library;
        this.functions = props.functions;
        this.state = {
            codec: null,
            fn: null,
            initializer: null,
            evaluator: null,
            instanceEvolvers: [],
            populations: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rebuild) {
            this.rebuild();
        }
    }

    initPopulations() {
        return this.props.instance.map(({populationSize}) => {
            return new bin32Population(populationSize, this.state.fn, this.state.codec, this.state.evaluator, this.state.initializer);
        });
    }

    setupGlobal() {
        return {
            codec: new bin32Codec(this.props.global.argRanges, null, this.props.global.bitSize),
            fn: this.functions[this.props.global.fn].fn,
            initializer: this.library.initializers[this.props.global.initializer].fn,
            evaluator: this.library.evaluators[this.props.global.evaluator].fn,
            populations: this.initPopulations()
        };
    }

    setupInstanceEvolvers() {
        const instanceEvolvers = this.props.instance.map((config, i) => {
            if (config.rebuild) {
                // Reverse composition?
                const selectParents = compose(...config.selectParents.map((i) => this.library.selectParents[i].fn))
                const recombine = compose(...config.recombine.map((i) => this.library.recombine[i].fn))
                const mutate = compose(...config.mutate.map((i) => this.library.mutate[i].fn))
                const selectSurvivors = compose(...config.selectSurvivors.map((i) => this.library.selectSurvivors[i].fn))
                return evolve(selectParents)(recombine)(mutate)(selectSurvivors);
            }
            return this.state.instanceEvolvers[i];
        });
        return instanceEvolvers;
    }

    rebuild() {
        console.log(this.setupGlobal());
        this.setState({
            ...this.state,
            ...this.setupGlobal(),
            instanceEvolvers: this.setupInstanceEvolvers(),
        });
        this.props.rebuilt();
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => ({
    global: state.globalConfiguration,
    instance: state.instanceConfiguration,
    rebuild: state.rebuild,
    evolve: state.evolve
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({rebuilt: rebuilt, saveData: saveData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Genetic);