import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import setGeneration from '../../store/actions/setGeneration';


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


class AppFooter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, value) => {
      this.setState({value: parseInt(value)});
  };

  render() {
    const handleChange = (event, value) => this.handleChange.call(this, event, value);
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
            <ToolbarTitle text={`Generation ${this.props.generation}`} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text="Generations" />
          <TextField name="generation" onChange={handleChange} type="number" defaultValue={this.state.value} style={styles.generations} underlineStyle={{borderColor: 'rgba(0, 0, 0, 0.4)'}} step={1} size={2}/><br/>
          <RaisedButton label="Evolve" primary={true} onClick={() => this.props.setGeneration(this.state.value + this.props.generation)}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const mapStateToProps = (state) => ({
    generation: state.generation,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setGeneration: setGeneration}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);