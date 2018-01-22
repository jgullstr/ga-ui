import React from 'react'
import { connect } from 'react-redux';

import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';


class Zombie extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        return this.props.children;
    }
}

const Progress = ({progress, children}) => {
    if (progress === null) {
        return children;
    }
    return (
      <React.Fragment>
        <Dialog title={`Loading ${progress}%`} modal={true} open={true} >
            <LinearProgress mode="determinate" value={progress} />
        </Dialog>
        <Zombie>{children}</Zombie>
      </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    progress: state.ui.progress,
});

export default connect(mapStateToProps)(Progress);