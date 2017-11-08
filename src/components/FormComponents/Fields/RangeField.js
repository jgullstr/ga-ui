import React from 'react';
import TextField from 'material-ui/TextField';

import {cyan500} from 'material-ui/styles/colors';

const fieldColor = {
    color: cyan500
}

const RangeField = (props) => {
    const common = {
        floatingLabelStyle: fieldColor,
        errorStyle: fieldColor,
        type: "number",
        step: 1,
    }
    return (
        <div className="range-field">
            <TextField {...common} floatingLabelText="From" type="number"/><br/>
            <TextField {...common} floatingLabelText="To" type="number"/>
        </div>
    );
}

export default RangeField;