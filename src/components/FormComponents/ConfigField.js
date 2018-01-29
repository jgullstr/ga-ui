import React from 'react';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import updateConfigurationValue from '../../store/actions/updateConfigurationValue';

const fieldColor = {
    color: '#000'
}

const ConfigField = (props) => {
    let fieldConfig = {
        floatingLabelText: props.name,
        floatingLabelStyle: fieldColor,
        errorText: props.description,
        errorStyle: fieldColor,
        disabled: props.disabled,
    }
    switch (props.type) {
        case 'int':
            fieldConfig.type = "number";
            fieldConfig.step = 1;
            break;
        case 'uint':
            fieldConfig.type = "number";
            fieldConfig.step = 1;
            fieldConfig.min = 0;
            break;
        case 'float':
            const span = Math.abs(props.range[1] - props.range[0]);
            fieldConfig.step = Math.pow(10, span.toString().length - 1) / 100;
            fieldConfig.type = "number";
            break;
        case 'text':
            fieldConfig.multiline = true;
            break;
        default:
            throw new TypeError(`Invalid field type "{$props.type}"`);
    }
    if (props.hasOwnProperty('range')) {
        [fieldConfig.min, fieldConfig.max] = props.range;
    }
    if (props.hasOwnProperty('value')) {
        fieldConfig.value = props.value;
    }
    if (props.hasOwnProperty('path')) {
        fieldConfig.onChange = (event, value) => props.updateConfigurationValue(value, props.path);
    }
    return (
        <TextField  {...fieldConfig}/>
    );
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      updateConfigurationValue: updateConfigurationValue,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigField);
