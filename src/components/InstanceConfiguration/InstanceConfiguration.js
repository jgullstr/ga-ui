import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

import MenuDialog from '../FormComponents/MenuDialog';

import addInstanceFunction from '../../store/actions/addInstanceFunction';
import setInstanceTab from '../../store/actions/setInstanceTab';

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

const InstanceConfiguration = (props) => {
    const labels = {
      parentSelectors: "Add parent selector",
      recombiners: "Add recombiner",
      mutators: "Add mutator",
      survivorSelectors: "Add survivor selector",
    }

    const selectedTab = props.config.hasOwnProperty('activeTab') ? props.config.activeTab : 'parentSelectors' //props.ui.selectedTab;

    if(!labels.hasOwnProperty(selectedTab)) {
      throw new RangeError('Undefined tab: ' + selectedTab);
    }
    
    const clickHandler = (fn) => {
      props.addInstanceFunction({
        index: props.index,
        key: selectedTab,
        fn: fn,
        ui: {
          expanded: true 
        }
      });
    }

    const Tab = <StepForm
      label={labels[selectedTab]}
      onClick={clickHandler}
      disabled={props.disabled}
      options={props.options[selectedTab]}
      type={selectedTab}
      values={props.config[selectedTab]}
    />;

    const onChange = (event, value) => props.setInstanceTab({
      index: props.index,
      value: value
    });

    return (
      <div className="container" style={{marginBottom: 1}}>
        <div style={style.leftCell}>
          <Menu value={selectedTab} listStyle={style.list} onChange={onChange}>
              <MenuItem primaryText="Parent selection"  value="parentSelectors" rightIcon={<FontIcon className="material-icons">wc</FontIcon>} />
              <MenuItem
                primaryText="Recombination"
                rightIcon={
                  <FontIcon className="material-icons">child_care</FontIcon>
                }
                value="recombiners"
              />
              <MenuItem primaryText="Mutation" value="mutators" rightIcon={<FontIcon className="material-icons">gesture</FontIcon>} />
              <MenuItem primaryText="Survivor selection" value="survivorSelectors" rightIcon={<FontIcon className="material-icons">group</FontIcon>} />
          </Menu>
        </div>

        <div style={style.rightCell}>
          {Tab}
        </div>
        <div style={style.clear}></div>
      </div>
    );
}

const mapStateToProps = (state) => ({
  
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      addInstanceFunction: addInstanceFunction,
      setInstanceTab: setInstanceTab,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceConfiguration);