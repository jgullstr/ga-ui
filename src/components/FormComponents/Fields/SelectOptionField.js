import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectOptionField = ({name, label, value, options, disabled, onChange}) => {
    return (
      <div>
        <SelectField
          fullWidth={true}
          floatingLabelText={label}
          name={name}
          value={value}
          onChange={(e,k,v) => onChange (v, [name])}
          disabled={disabled}
        >
          {Object.keys(options).map((key) => 
            <MenuItem value={key} primaryText={options[key]} key={key}/>
          )}
        </SelectField>
      </div>
    );
}

export default SelectOptionField;