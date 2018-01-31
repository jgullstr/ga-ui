import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import setGenerationsInput from '../../store/actions/setGenerationsInput';
import geneticEvolve from '../../store/geneticActions/geneticEvolve';
import geneticReset from '../../store/geneticActions/geneticReset';

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

const AppFooter = ({currentGeneration, setGenerationsInput, generations, geneticEvolve, geneticReset}) => {
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
          <MenuItem primaryText="Reset generations" onClick={() => geneticReset()} />
        </IconMenu>
          <ToolbarTitle text={`Generation ${currentGeneration}`} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text="Generations" />
        <TextField name="generation" onChange={(event, value) => setGenerationsInput(value)} type="number" value={generations} style={styles.generations} underlineStyle={{borderColor: 'rgba(0, 0, 0, 0.4)'}} step={1} size={2}/><br/>
        <RaisedButton label="Evolve" primary={true} onClick={() => geneticEvolve()}/>
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
      geneticEvolve: geneticEvolve,
      geneticReset: geneticReset,
      setGenerationsInput: setGenerationsInput,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);