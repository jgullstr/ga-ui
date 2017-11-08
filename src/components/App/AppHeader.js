import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import toggleDrawer from '../../store/actions/toggleDrawer';

const ViewModeToggler = (props) => {
    return (
      <div>
        <IconButton tooltip="Instance settings" iconClassName="material-icons">
          settings
        </IconButton>
        <IconButton tooltip="Chart" iconClassName="material-icons">
          show_chart
        </IconButton>
      </div>
    );
  }
  
const AppHeader = ({toggleDrawer}) => {
    return (
        <header className="App-header">
        <AppBar title="Genetic algorithm evaluator" iconElementRight={<ViewModeToggler />} onLeftIconButtonTouchTap={toggleDrawer}/>
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