import React from 'react';
import { dispatchSetValue } from './helpers';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectOptionField = ({name, label, value, options, disabled, onChange}) => {
    return (
      <div>
        <SelectField fullWidth={true} floatingLabelText={label} name={name} value={value} onChange={dispatchSetValue(onChange, name)} disabled={disabled}>
          {options.map((item, i) =>
            <MenuItem value={i} primaryText={item} key={i}/>
          )}
        </SelectField>
      </div>
    );
}

export default SelectOptionField;