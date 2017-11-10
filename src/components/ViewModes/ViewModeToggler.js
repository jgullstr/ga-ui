import React from 'react';
import IconButton from 'material-ui/IconButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import setViewMode from '../../store/actions/setViewMode';

const style = {
    color: '#ffffff'
}

const ViewModeToggler = ({mode, setViewMode}) => {
    return (
      <div>
        <IconButton
            tooltip="Instance settings"
            iconClassName="material-icons"
            iconStyle={style}
            disabled={mode === 'InstancesConfiguration'}
            onClick={() => setViewMode('InstancesConfiguration')}
        >settings</IconButton>
        <IconButton
            tooltip="Chart"
            iconClassName="material-icons"
            iconStyle={style}
            disabled={mode === 'Chart'}
            onClick={() => setViewMode('Chart')}
        >show_chart</IconButton>
      </div>
    );
};

const mapStateToProps = (state) => ({
    mode: state.ui.viewMode,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setViewMode: setViewMode}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewModeToggler);