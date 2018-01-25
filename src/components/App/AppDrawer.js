import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from 'material-ui/Drawer';
import GlobalConfiguration from '../GlobalConfiguration/GlobalConfiguration';

import toggleDrawer from '../../store/actions/toggleDrawer';

const AppDrawer = ({open, toggleDrawer, options, locked}) => {
  return (
    <Drawer
      docked={false}
      open={open || !locked}
      onRequestChange={x => locked ? toggleDrawer() : null}
    >
      <div className="padded">
        <h2>Global configuration</h2>
        <div className="padded">
          <GlobalConfiguration options={options}/>
        </div>
      </div>
    </Drawer>
  );
}

const mapStateToProps = (state) => ({
    open: state.ui.displayDrawer || !state.globalConfiguration.locked,
    locked: state.globalConfiguration.locked,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({toggleDrawer: toggleDrawer}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);