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
import ConfigForm from '../FormComponents/ConfigForm';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

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

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

const StepForm = (props) => {
  const items = props.values.map((value, key) => <ConfigForm key={key} type={props.type} value={value}/>);
  return (
    <div style={{height: '100%', display: 'block'}}>
      <SortableList items={items}/>
      <MenuDialog
        disabled={props.disabled}
        options={props.options}
        label={props.label}
        onClick={props.onClick}
      />
    </div>
  );
}

class InstanceConfiguration extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: "parentselection",
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

    const getForm = (label, key) => {
      return <StepForm
        label={label}
        onClick={clickHandler(this.props.index, key)}
        disabled={this.props.disabled}
        options={this.props.options[key]}
        type={key}
        values={this.props.config[key]}
      />;
    }

    switch (this.state.value) {
      case 'parentselection':
        return getForm('Add parent selector', 'parentSelectors');

      case 'recombination':
        return getForm('Add recombiner', 'recombiners');

      case 'mutation':
        return getForm('Add mutator', 'mutators');

      case 'survivorselection':
        return getForm('Add survivor selector', 'survivorSelectors');

    }
  }

  render() {
    const onChange = (event, value) => this.setState.call(this, {value: value});
    const ConfigTab = this.getComponent();
    return (
      <div className="container" style={{marginBottom: 1}}>
        <div style={style.leftCell}>
          <Menu  value={this.state.value} listStyle={style.list} onChange={onChange}>
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