import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';

import toggleDrawer from '../../store/actions/toggleDrawer';

import ViewModeToggler from '../ViewModes/ViewModeToggler';
  
const styles = {
    appbar: {
        position: 'fixed',
        width: '100%',
        top: 0,
    }
}

const AppHeader = ({toggleDrawer}) => {
    return (
        <header className="App-header">
        <AppBar
            title="Genetic algorithm evaluator"
            iconElementRight={<ViewModeToggler />}
            onLeftIconButtonTouchTap={toggleDrawer}
            style={styles.appbar}
        />
        </header>
    );
}

const mapStateToProps = (state) => ({
    open: state.drawer,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({toggleDrawer: toggleDrawer}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);