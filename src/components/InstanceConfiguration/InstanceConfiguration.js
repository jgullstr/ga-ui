import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

import FunctionComposer from '../FormComponents/FunctionComposer';

const style = {
  leftCell: {
    display: 'table-cell',
    verticalAlign: 'top',
    marginBottom: 1
  },
  rightCell: {
    display: 'table-cell',
    verticalAlign: 'top',
    width: '100%',
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
    console.log(this.props.params);
    let options;
    switch (this.state.value) {
      case "overview":
        options = {
          todo: "todo",
        };
        return <FunctionComposer options={options}/>;
      case "general":
        options = {
          todo: "todo",
        };
        return <FunctionComposer options={options}/>;

      case "parentselection":
        options = this.props.options.parentSelectors;
        return <FunctionComposer options={options}/>;

      case "recombination":
        options = this.props.options.recombiners;
        return <FunctionComposer options={options}/>;
  
      case "mutation":
        options = this.props.options.mutators;
        return <FunctionComposer options={options}/>;

      case "survivorselection":    
        options = this.props.options.survivorSelectors;
        return <FunctionComposer options={options}/>;

      default:
        options = {
          todo: "todo",
        };    
        return <FunctionComposer options={options}/>;
    }
  }

  render() {
    const onChange = (event, value) => this.setState.call(this, {value: value});
    const ConfigTab = this.getComponent();
    return (
      <div className="container" style={{marginBottom: 1}}>
        <div style={style.leftCell}>
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
        
        <div style={style.rightCell}>
          {ConfigTab}
        </div>
        <div style={style.clear}></div>
      </div>
    );
  }
}

export default InstanceConfiguration;