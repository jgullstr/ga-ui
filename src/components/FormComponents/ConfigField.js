import React from 'react';
import TextField from 'material-ui/TextField';

import {blue500} from 'material-ui/styles/colors';

const fieldColor = {
    color: '#000'
}

const ConfigField = (props) => {
    let fieldConfig = {
        floatingLabelText: props.name,
        floatingLabelStyle: fieldColor,
        errorText: props.description,
        errorStyle: fieldColor
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
    }
    if (props.hasOwnProperty('range')) {
        [fieldConfig.min, fieldConfig.max] = props.range;
    }
    if (props.hasOwnProperty('value')) {
        fieldConfig.value = props.value;
    }
    return (
        <TextField {...fieldConfig}/>
    );
}

export default ConfigField;