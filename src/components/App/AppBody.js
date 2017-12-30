import React from 'react';
import { connect } from 'react-redux';

import Chart from '../ViewModes/Chart';
import InstancesConfiguration from '../ViewModes/InstancesConfiguration';

const styles = {
  body: {
    marginBottom: 56,
    marginTop: 56
  }
}

const error = ({name}) => {
  return (
    <div>Unknown view mode: {name}</div>
  );
};

const ViewModes = {
  Chart: Chart,
  InstancesConfiguration: InstancesConfiguration
}

const AppBody = (props) => {
    const ViewMode = ViewModes.hasOwnProperty(props.mode) ? ViewModes[props.mode] : error;
    return (
      <div className="content" style={styles.body}>
        <ViewMode options={props.options} params={props.params}/>
      </div>
    );
}

const mapStateToProps = (state) => ({
  mode: state.ui.viewMode, 
});

export default connect(mapStateToProps)(AppBody);