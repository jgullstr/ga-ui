import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import { bindActionCreators } from 'redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { actionCreator } from '../../store/actions/globalConfigSet';

const dispatchSetValue = (dispatcher, storeKey) => (event, key, value) => {
  return dispatcher({[storeKey]: value});
}

const RadioOptionField = ({name, value, options, onChange}) => {
  return (
    <div>
      <RadioButtonGroup name={name} valueSelected={value} onChange={onChange}>
        {options.map((item, value) => 
          <RadioButton
            value={value}
            label={item.name}
            key={value}
          />
        )}
      </RadioButtonGroup>
    </div>
  );
}

const SelectOptionField = ({name, label, value, options, onChange}) => {
  return (
    <div>
      <SelectField floatingLabelText={label} name={name} value={value} onChange={onChange}>
        {options.map((item, i) =>
          <MenuItem value={i} primaryText={item.name} key={i}/>
        )}
      </SelectField>
    </div>
  );
}

const GlobalConfigForm = (props) => {
  console.log(props)
  return (
    <div>
        <label>Bitsize:</label><br />
        <Slider
          name="bitsize"
          min={1}
          max={32}
          step={1}
          value={props.values.bitSize}
        />
        <br />
        <label>Function:</label><br />
        <SelectOptionField name="function" label="Function" options={props.functions} value={props.values.function} onChange={dispatchSetValue(props.setValue, 'function')}/>
        <br />
        <label>Evaluate:</label>
        <br />
        <RadioOptionField name="evaluator" options={props.library.evaluators} value={props.values.evaluator}/>
        <label>Initialize:</label>
        <br />
        <RadioOptionField name="initiator" options={props.library.initializers} value={props.values.initializer}/>
      </div>
    );
}

const mapStateToProps = (state) => ({
  values: state.global,
  functions: state.functions,
  library: state.library
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setValue: actionCreator}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfigForm);