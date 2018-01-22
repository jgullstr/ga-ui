import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const RadioOptionField = ({name, value, options, disabled, onChange}) => {
    return (
      <div className="radios">
        <RadioButtonGroup name={name} valueSelected={value} onChange={(e,v) => onChange(v, [name])}>
          {Object.keys(options).map((key) => 
            <RadioButton
              value={key}
              label={options[key]}
              key={key}
              disabled={disabled}
            />
          )}
        </RadioButtonGroup>
      </div>
    );
  }

export default RadioOptionField;