import React from 'react';
import { dispatchSetValue } from './helpers';
import Slider from 'material-ui/Slider';

const SliderField = ({name, label, min, max, step, value, disabled, onChange}) => {
    return (
      <div>
        <label>{label}: {value}</label><br />
        <Slider
          sliderStyle={{marginBottom:10}}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={dispatchSetValue(onChange, name)}
        />
      </div>
    );
}

export default SliderField;