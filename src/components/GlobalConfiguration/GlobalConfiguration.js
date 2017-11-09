import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import setGlobalConfig from '../../store/actions/setGlobalConfig';
import initGlobal from '../../store/actions/initGlobal';
import resetGlobal from '../../store/actions/resetGlobal';

import RadioOptionField from '../FormComponents/Fields/RadioOptionField';
import SelectOptionField from '../FormComponents/Fields/SelectOptionField';
import SliderField from '../FormComponents/Fields/SliderField';

import RaisedButton from 'material-ui/RaisedButton';

import Divider from 'material-ui/Divider';

//import FunctionConfiguration from './FunctionConfiguration';

const GlobalConfiguration = ({options, values, resetGlobal, initGlobal, setGlobalConfig}) => {
  const buttonArgs = values.locked ?
    {
      label: "Reset",
      onClick: resetGlobal,
      secondary: true,
    }
    : {
      label: "Initialize",
      onClick: initGlobal,
      primary: true
    };
    console.log(options);
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

        <br />
        <label>Function:</label><br /><br />
        <SelectOptionField
          name="fn"
          options={options.functions}
          value={values.fn}
          onChange={setGlobalConfig}
          disabled={values.locked}
        />
        <br /><span className="hint">Function to determine fitness.</span><br /><br />
        <br />
        <label>Evaluator:</label><br /><br />
        <RadioOptionField
          name="evaluator"
          options={options.evaluators}
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
          options={options.initializers}
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
  return bindActionCreators({setGlobalConfig: setGlobalConfig, initGlobal: initGlobal, resetGlobal: resetGlobal}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfiguration);