import React from 'react';
import { dispatchSetValue } from './helpers';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const RadioOptionField = ({name, value, options, disabled, onChange}) => {
    return (
      <div className="radios">
        <RadioButtonGroup name={name} valueSelected={value} onChange={dispatchSetValue(onChange, name)}>
          {options.map((item, i) => 
            <RadioButton
              value={i}
              label={item}
              key={i}
              disabled={disabled}
            />
          )}
        </RadioButtonGroup>
      </div>
    );
  }

export default RadioOptionField;