import React from 'react';
import { dispatchSetValue } from './helpers';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const RadioOptionField = ({name, value, options, disabled, onChange}) => {
    return (
      <div className="radios">
        <RadioButtonGroup name={name} valueSelected={value} onChange={dispatchSetValue(onChange, name)}>
          {options.map((item, value) => 
            <RadioButton
              value={value}
              label={item.name}
              key={value}
              disabled={disabled}
            />
          )}
        </RadioButtonGroup>
      </div>
    );
  }

export default RadioOptionField;