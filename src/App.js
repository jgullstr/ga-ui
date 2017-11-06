import React, { Component } from 'react';
import './App.css';

import 'typeface-roboto';
import 'material-design-icons-iconfont';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStoreWithData, actions } from './store';
import GlobalConfiguration from './components/GlobalConfiguration/GlobalConfiguration';
import genetic from './genetic';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

/**
 * Default, empty configuration.
 */
const defaultGlobalConfig = {
  // If locked, global configuration cannot be edited.
  displayGlobalConfiguration: true,
  locked: false,
  // Global configuration common between the instances.
  global: {
    bitSize: 32,
    function: 0,
    population: 0,
    evaluator: 0,
    initializer: 0,
  },
  // Functions to optimize.
  functions: [
    {
      name: 'Square',
      fn: x => Math.pow(x,2),
    },
    {
      name: 'Cube',
      fn: x => Math.pow(x,3),
    },
  ],
  // Instances of configured genetic algorithms.
  instances: [],
  // Populations for each instance.
  populations: [],

  library: genetic,
};

const store = createStoreWithData(defaultGlobalConfig);


const AppDrawer = (props) => {
  return (
    <Drawer 
      open={props.open}
    >
      <div className="padded">
        <h2>Global configuration</h2>
        <div className="padded">
          <GlobalConfiguration/>
          <br/>
          <RaisedButton label="Close" fullWidth={true} />
        </div>
      </div>
    </Drawer>
  );
}


const ToggleMode = (props) => {
  return (
    <div>
      <IconButton tooltip="Instance settings" iconClassName="material-icons">
        settings
      </IconButton>
      <IconButton tooltip="Chart" iconClassName="material-icons">
        show_chart
      </IconButton>
    </div>
  );
}

const AppHeader = (props) => {
  return (
    <header className="App-header">
      <AppBar title="Genetic algorithm evaluator" iconElementRight={<ToggleMode />}/>
    </header>
  );
}

const AppBody = (props) => {
  return (
    <div className="content">
    </div>
  );
}


const App = (props) => {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div className="container">
            <AppHeader/>
            <AppDrawer open={true}/>
            <AppBody/>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
}

export default App;