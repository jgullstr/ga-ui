import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectOptionField from './Fields/SelectOptionField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class MenuDialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const dialog = this;
    const onClick = (key) => () => {
      dialog.props.onClick(key);
      dialog.handleClose();
    }
    return (
      <div>
        <RaisedButton label={this.props.label} disabled={this.props.disabled} onClick={this.handleOpen} />
        <Dialog
          title={this.props.label}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <Menu>
        {Object.keys(this.props.options).map((key) => {
           return (
            <MenuItem key={key} primaryText={this.props.options[key]} onClick={onClick(key)}/>
           )
        })}
        </Menu>
        </Dialog>
      </div>
    );
  }
}
export default MenuDialog;