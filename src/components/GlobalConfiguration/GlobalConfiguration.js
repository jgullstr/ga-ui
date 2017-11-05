import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const RadioOptionField = (props) => {
  return (
  <div>
    <RadioButtonGroup>
      {props.options.map((item, value) => 
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

const SelectOptionField = (props) => {
  return (
  <div>
    <SelectField floatingLabelText={props.label}>        
      {props.options.map((item, i) =>
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
          min={1}
          max={32}
          step={1}
          value={props.values.bitSize}
        />
        <br />
        <label>Function:</label><br />
        <SelectOptionField options={props.functions}/>
        <br />
        <label>Evaluate:</label>
        <br />
        <RadioOptionField options={props.library.evaluators}/>
        <label>Initialize:</label>
        <br />
        <RadioOptionField options={props.library.initializers}/>
      </div>
    );
}
const mapDispatchToProps = dispatch => ({});
const mapStateToProps = (state) => ({values: state.global, functions: state.functions, library: state.library});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfigForm);