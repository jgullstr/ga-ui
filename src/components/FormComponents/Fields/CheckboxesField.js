import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const CheckboxesField = ({name, value, options, disabled, onChange}) => {
    return (
      <div className="checkboxes">
        {Object.keys(options).map((key) => 
            <Checkbox
              value={key}
              checked={value[key]}
              onCheck={() => onChange(key)}
              label={options[key]}
              key={key}
              disabled={disabled}
            />
          )}
      </div>
    );
  }

export default CheckboxesField;