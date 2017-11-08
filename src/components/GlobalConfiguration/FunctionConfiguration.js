import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import setGlobalConfig from '../../store/actions/setGlobalConfig';
import RangeField from '../FormComponents/Fields/RangeField';

const FunctionConfiguration = ({functions}) => {
  
  const functionArgsForm = Array.apply(null, {length: fn.length}).map((value, i) => {
    return (
      <div>
      <label>Argument {i + 1} range:</label><br/>
      <RangeField key={i}/>
      </div>
    );
  });
}

const mapStateToProps = (state) => ({
  fn: state.functions[state.global.fn]['fn'],
  config: {}
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setGlobalConfig: setGlobalConfig}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionConfiguration);