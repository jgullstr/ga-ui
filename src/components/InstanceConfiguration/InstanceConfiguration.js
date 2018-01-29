import React from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import MenuDialog from '../FormComponents/MenuDialog';

import addInstanceFunction from '../../store/actions/addInstanceFunction';
import setInstanceTab from '../../store/actions/setInstanceTab';
import orderInstanceFunctions from '../../store/actions/orderInstanceFunctions';
import deleteInstanceFunction from '../../store/actions/deleteInstanceFunction';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConfigForm from '../FormComponents/ConfigForm';

import SortableList from '../FormComponents/SortableList';

import {geneticOptions, geneticParams} from '../../genetic';

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

const StepForm = (props) => {
  const items = props.values.map((value, key) => <ConfigForm key={key} deleteFunction={() => props.deleteInstanceFunction(key,[props.index, props.type])} path={['instanceConfigurations', props.index, props.type, key]} type={props.type} value={value} disabled={props.disabled}/>);
  return (
    <div style={{height: '100%', display: 'block'}}>
      <SortableList lockAxis="y" disabled={props.disabled} items={items} onSortEnd={(indices) => props.onSortEnd(indices, [props.index, props.type])}/>
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

    const config = props.instanceConfigurations[props.index];
    const labels = {
      parentSelectors: "Add parent selector",
      recombiners: "Add recombiner",
      mutators: "Add mutator",
      survivorSelectors: "Add survivor selector",
    }

    const selectedTab = config.hasOwnProperty('activeTab') ? config.activeTab : 'parentSelectors' //props.ui.selectedTab;

    if(!labels.hasOwnProperty(selectedTab)) {
      throw new RangeError('Undefined tab: ' + selectedTab);
    }
    
    const clickHandler = (fn) => {
      props.addInstanceFunction(
        {fn: fn, params: geneticParams[selectedTab][fn].map((fnparams) => fnparams.default)},
        [props.index, selectedTab]
      );
    }

    const onChange = (event, value) => props.setInstanceTab({
      value: value
    }, [props.index, 'activeTab']);

    return (
      <div className="container" style={{marginBottom: 1}}>
        <div style={style.leftCell}>
          <Menu value={selectedTab} listStyle={style.list} onChange={onChange} disableAutoFocus={true}>
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
          <StepForm
            index={props.index}
            label={labels[selectedTab]}
            onClick={clickHandler}
            disabled={props.disabled}
            options={geneticOptions[selectedTab]}
            type={selectedTab}
            values={config[selectedTab]}
            onSortEnd={props.orderInstanceFunctions}
            action={props.updateInstanceFunction}
            deleteInstanceFunction={props.deleteInstanceFunction}
          />
        </div>
        <div style={style.clear}></div>
      </div>
    );
}

const mapStateToProps = (state) => ({
  instanceConfigurations: state.instanceConfigurations,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      addInstanceFunction: addInstanceFunction,
      setInstanceTab: setInstanceTab,
      orderInstanceFunctions: orderInstanceFunctions,
      deleteInstanceFunction: deleteInstanceFunction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceConfiguration);