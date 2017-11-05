import React from 'react';
import TextField from 'material-ui/TextField';

import {blue500} from 'material-ui/styles/colors';

const fieldColor = {
    color: '#000'
}

const ConfigField = (props) => {
    const params = props.field;
    console.log(props);
    let fieldConfig = {
        floatingLabelText: params.name,
        floatingLabelStyle: fieldColor,
        errorText: params.description,
        errorStyle: fieldColor
    }
    if (params.hasOwnProperty('range')) {
        [fieldConfig.min, fieldConfig.max] = params.range;
    }

    switch (params.type) {
        case 'int':
            fieldConfig.type = "number";
            fieldConfig.step = 1;
            break;
        case 'float':
            const span = Math.abs(params.range[1] - params.range[0]);
            fieldConfig.step = Math.pow(10, span.toString().length - 1) / 100;
            fieldConfig.type = "number";
            break;
        case 'text':
            fieldConfig.multiline = true;
            break;
    }
    console.log(fieldConfig);
    return (
        <TextField {...fieldConfig}/>
    );
}

export default ConfigField;