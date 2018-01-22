import React from 'react';
import TextField from 'material-ui/TextField';

const fieldColor = {
    color: '#000'
}

const NumberField = ({name, label, onChange, value}) => {
    return (
        <div>
            <TextField
                onChange={(e,v) => onChange(v, [name])}
                floatingLabelStyle={fieldColor}
                errorStyle={fieldColor}
                type="number"
                step={1}
                floatingLabelText={label}
                value={value}
                fullWidth={true}
            />
        </div>
    );
}

export default NumberField;