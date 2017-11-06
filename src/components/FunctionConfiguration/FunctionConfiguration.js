import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreator } from '../../store/actions/globalConfigSet';

import RadioOptionField from '../FormComponents/Fields/RadioOptionField';
import SelectOptionField from '../FormComponents/Fields/SelectOptionField';
import SliderField from '../FormComponents/Fields/SliderField';

import RaisedButton from 'material-ui/RaisedButton';

import Divider from 'material-ui/Divider';

const GlobalConfigForm = ({locked, values, functions, library, setValue}) => {
  const buttonArgs = locked ? {secondary: true, label: "Reset"} : {primary: true, label: "Initialize"};
  return (
    <div>
        <p><i>The global configuration is common between all algorithm instances. <b>Changing these parameters will clear current progress.</b></i></p>
        <SliderField label="Chromosome size" name="bitSize" min={1} max={32} step={1} value={values.bitSize} onChange={setValue} disabled={locked}/>
        <span className="hint">Amount of bits for a single chromosome.</span><br /><br />
        
        <SelectOptionField name="function" label="Function" options={functions} value={values.function} onChange={setValue} disabled={locked}/>
        <span className="hint">Main function to optimize.</span><br /><br /><br />

        <br />
        <label>Evaluator:</label><br /><br />
        <RadioOptionField name="evaluator" options={library.evaluators} value={values.evaluator} onChange={setValue} disabled={locked}/>
        <br /><span className="hint">Function to determine fitness.</span><br /><br />

        <Divider />
        
        <br />
        <label>Initialize:</label><br /><br />
        <RadioOptionField name="initializer" options={library.initializers} value={values.initializer} onChange={setValue} disabled={locked}/>
        <br /><span className="hint">How to initialize algorithm instances.</span>
        <br />
        <br />
        <RaisedButton {...buttonArgs} fullWidth={true} />
      </div>
    );
}

const mapStateToProps = (state) => ({
  locked: state.locked,
  values: state.global,
  functions: state.functions,
  library: state.library
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setValue: actionCreator}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfigForm);