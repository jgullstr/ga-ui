import React from 'react';
import ConfigField from './ConfigField';

const ConfigForm = (props) => {
    const fieldInfo = props.src;
    return (
        <div>
        <h2>{fieldInfo.name}</h2>
        <span>{fieldInfo.description}</span>
        <div>
            {fieldInfo.params.map((field, i) => <ConfigField field={field} key={i}/>)}
        </div>
        </div>
    );
}

export default ConfigForm;