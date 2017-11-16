import React from 'react'
import { connect } from 'react-redux';

import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';

const Progress = (props) => {
    if (typeof(props.progress) === 'undefined') {
        return props.children;
    }
    return (
      <Dialog title={`Loading ${props.progress}%`} modal={true} open={true} >
        <LinearProgress mode="determinate" value={props.progress} />
      </Dialog>
    );
}

const mapStateToProps = (state) => ({
    progress: state.progress,
});

export default connect(mapStateToProps)(Progress);