import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

const style = {
  floatLeft: {
    display: 'inline-block',
    float: 'left',
    marginBottom: 1
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  clear: {
    clear: 'both',
  },
};

class InstanceConfiguration extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: "overview",
    }
  }

  getComponent() {
    let component;
    switch (this.state.value) {
      case "overview":
        component = "OVERVIEW";
        break;
      case "general":
        component = "general";
        break;
      case "parentselection":
        component = "parentselection";
        break;
      case "recombination":
        component = "recombination";
        break;
      case "mutation":
        component = "mutation";
        break;
      case "survivorselection":
        component = "survivorselection";
        break;
      default:
        component = "Unknown component";
        break;
    }
    return component;
  }

  render() {
    const onChange = (event, value) => this.setState.call(this, {value: value});
    const ConfigTab = this.getComponent();
    return (
      <div className="container" style={{marginBottom: 1}}>
        <div style={style.floatLeft}>
          <Menu  value={this.state.value} listStyle={style.list} onChange={onChange}>
              <MenuItem primaryText="Overview"  value="overview" style={style.inactive} rightIcon={<FontIcon className="material-icons">visibility</FontIcon>} />
              <MenuItem primaryText="General"  value="general" rightIcon={<FontIcon className="material-icons">settings</FontIcon>} />
              <MenuItem primaryText="Parent selection"  value="parentselection" rightIcon={<FontIcon className="material-icons">wc</FontIcon>} />
              <MenuItem
                primaryText="Recombination"
                rightIcon={
                  <FontIcon className="material-icons">child_care</FontIcon>
                }
                value="recombination"
              />
              <MenuItem primaryText="Mutation" value="mutation" rightIcon={<FontIcon className="material-icons">gesture</FontIcon>} />
              <MenuItem primaryText="Survivor selection" value="survivorselection" rightIcon={<FontIcon className="material-icons">group</FontIcon>} />
          </Menu>
        </div>
        
        <div style={style.floatLeft}>
          <h1>{ConfigTab}</h1>
        </div>
        <div style={style.clear}></div>
      </div>
    );
  }
}

export default InstanceConfiguration;