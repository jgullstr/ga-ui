import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import setGeneration from '../../store/actions/setGeneration';
import setGenerationsInput from '../../store/actions/setGenerationsInput';

const styles = {
    toolbar: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
    },
    generations: {
        width: 50,
        borderColor: 'red'
    }
}

const AppFooter = ({setGeneration, currentGeneration, setGenerationsInput, generations}) => {
  return (
    <Toolbar style={styles.toolbar}>
      <ToolbarGroup firstChild={true}>
      <IconMenu
          iconButtonElement={
              <IconButton
                  iconClassName="material-icons"
                  iconStyle={{color: 'rgba(0, 0, 0, 0.4)'}}
              >swap_vert</IconButton>
          }
        >
          <MenuItem primaryText="Recalculate" />
          <MenuItem primaryText="Reset" />
          <MenuItem primaryText="Import configuration" />
          <MenuItem primaryText="Export configuration" />
          <MenuItem primaryText="Export data" />
        </IconMenu>
          <ToolbarTitle text={`Generation ${currentGeneration}`} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text="Generations" />
        <TextField name="generation" onChange={(event, value) => setGenerationsInput(value)} type="number" value={generations} style={styles.generations} underlineStyle={{borderColor: 'rgba(0, 0, 0, 0.4)'}} step={1} size={2}/><br/>
        <RaisedButton label="Evolve" primary={true} onClick={() => setGeneration(parseInt(currentGeneration) + parseInt(generations))}/>
      </ToolbarGroup>
    </Toolbar>
  );
}

const mapStateToProps = (state) => ({
    currentGeneration: state.currentGeneration,
    generations: state.ui.generations,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setGeneration: setGeneration,
      setGenerationsInput: setGenerationsInput,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);