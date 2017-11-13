import React from 'react';
import SelectOptionField from './Fields/SelectOptionField';

const FunctionComposer = (props) => {
    return (
        <SelectOptionField
            name="test"
            label="test"
            value="test"
            options={props.options}
            onChange={ x => x }
        />
    )
}

export default FunctionComposer;