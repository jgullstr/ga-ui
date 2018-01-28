import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {geneticOptions} from '../../genetic';
import geneticGlobalLock from '../../store/geneticActions/geneticGlobalLock';
import geneticGlobalReset from '../../store/geneticActions/geneticGlobalReset';

import setGlobalConfig from '../../store/actions/setGlobalConfig';
import setFunction from '../../store/actions/setFunction';

import RadioOptionField from '../FormComponents/Fields/RadioOptionField';
import SelectOptionField from '../FormComponents/Fields/SelectOptionField';
import SliderField from '../FormComponents/Fields/SliderField';
import NumberField from '../FormComponents/Fields/NumberField';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import toggleDrawer from '../../store/actions/toggleDrawer';

//import FunctionConfiguration from './FunctionConfiguration';

const GlobalConfiguration = ({values, geneticGlobalReset, geneticGlobalLock, setGlobalConfig, setFunction, toggleDrawer}) => {
  const buttonArgs = values.locked ?
    {
      label: "Reset",
      onClick: x => geneticGlobalReset(),
      secondary: true,
    }
    : {
      label: "Initialize",
      onClick: x => {
        geneticGlobalLock();
        toggleDrawer(false);
      },
      primary: true
    };
  return (
    <div>
        <p><i>The global configuration is common between all algorithm instances. <b>Changing these parameters will clear current progress.</b></i></p>
        <SliderField
          label="Chromosome size"
          name="bitSize"
          min={1}
          max={32}
          step={1}
          value={values.bitSize}
          onChange={setGlobalConfig}
          disabled={values.locked}
        />
        <span className="hint">Amount of bits for a single chromosome.</span><br /><br />
        <NumberField
          name="populationSize"
          label="Population size"
          value={values.populationSize}
          onChange={setGlobalConfig}
        />
        <span className="hint">Amount of chromosomes in population.</span><br /><br />
        <br />
        <br />

        <label>Function:</label><br /><br />
        <SelectOptionField
          name="globalConfiguration"
          options={geneticOptions.functions}
          value={values.fn}
          onChange={setFunction}
          disabled={values.locked}
        />
        <br /><span className="hint">Function to optimize.</span><br /><br />
        <br />
        <label>Evaluator:</label><br /><br />
        <RadioOptionField
          name="evaluator"
          options={geneticOptions.evaluators}
          value={values.evaluator}
          onChange={setGlobalConfig}
          disabled={values.locked}
        />
        <br /><span className="hint">Function to determine fitness.</span><br /><br />

        <Divider />

        <br />
        <label>Initialize:</label><br /><br />
        <RadioOptionField
          name="initializer"
          options={geneticOptions.initializers}
          value={values.initializer}
          onChange={setGlobalConfig}
          disabled={values.locked}
        />
        <br /><span className="hint">How to initialize algorithm instances.</span>
        <br />
        <br />
        <RaisedButton {...buttonArgs} fullWidth={true}/>
      </div>
    );
}

const mapStateToProps = (state) => ({
  values: state.globalConfiguration
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setGlobalConfig: setGlobalConfig,
    setFunction: setFunction,
    geneticGlobalLock: geneticGlobalLock,
    geneticGlobalReset: geneticGlobalReset,
    toggleDrawer: toggleDrawer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfiguration);