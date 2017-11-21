import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

import MenuDialog from '../FormComponents/MenuDialog';

import addInstanceFunction from '../../store/actions/addInstanceFunction';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    const addFunction = this.props.addInstanceFunction;
    const clickHandler = (index, key) => (fn) => {
      addFunction({
        index: index,
        key: key,
        fn: fn
      });
    }
    switch (this.state.value) {
      case "overview":
        return <h1>Overview</h1>;

      case "parentselection":
        return <MenuDialog
          disabled={this.props.disabled}
          options={this.props.options.parentSelectors}
          label="Add parent selector"
          onClick={clickHandler(this.props.index, 'parentSelectors')}
        />;

      case "recombination":
        return <MenuDialog
          disabled={this.props.disabled}
          options={this.props.options.recombiners}
          label="Add recombiner"
          onClick={clickHandler(this.props.index, 'recombiners')}
        />;
  
      case "mutation":
        return <MenuDialog
          disabled={this.props.disabled}
          options={this.props.options.mutators}
          label="Add mutator"
          onClick={clickHandler(this.props.index, 'mutators')}
        />;

      case "survivorselection":
        return <MenuDialog
          disabled={this.props.disabled}
          options={this.props.options.survivorSelectors}
          label="Add survivor selector"
          onClick={clickHandler(this.props.index, 'survivorSelectors')}
        />;
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

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      addInstanceFunction: addInstanceFunction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceConfiguration);