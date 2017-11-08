import React from 'react';
import './App.css';

import 'typeface-roboto';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStoreWithData } from './store';
import genetic from './genetic';

import AppDrawer from './components/App/AppDrawer';
import AppHeader from './components/App/AppHeader';
import AppBody from './components/App/AppBody';

const functions = [
  {
    name: 'Square',
    fn: (x, y) => Math.pow(x,2),
  },
  {
    name: 'Cube',
    fn: x => Math.pow(x,3),
  },
];


/**
 * Default, empty configuration.
 */
const defaultConfig = {
  // If locked, global configuration cannot be edited.
  ui: {
    displayDrawer: false,
    viewMode: 'instanceConfig',
  },
  globalConfiguration: {
    bitSize: 32,
    fn: 0,
    argRanges: [],
    population: 0,
    evaluator: 0,
    initializer: 0,
    locked: false,
  },
  instanceConfigurations: [],
  evolve: 0,
  generation: 0,
  options: {
    functions: functions.map(fn => fn.name),
    initializers: genetic.initializers.map(fn => fn.name),
    evaluators: genetic.evaluators.map(fn => fn.name)
  },
  data: []
};

const store = createStoreWithData(defaultConfig);


const App = (props) => {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div className="container">
            <AppHeader/>
            <AppDrawer/>
            <AppBody/>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
}

export default App;