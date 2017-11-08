import React from 'react';
import './App.css';

import 'typeface-roboto';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStoreWithData } from './store';
import genetic from './genetic';

import Genetic from './components/Genetic/Genetic';
import AppDrawer from './components/App/AppDrawer';
import AppHeader from './components/App/AppHeader';
import AppBody from './components/App/AppBody';

import bin32Population from './genetic/population';
import bin32Codec from './genetic/codec';

// No support for different codecs or populations in current version.
const populationClass = bin32Population;
const codecClass = bin32Codec;

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
  instanceConfiguration: [],
  evolve: 0,
  generation: 0,
  options: {
    functions: functions.map(fn => fn.name),
    initializers: genetic.initializers.map(fn => fn.name),
    evaluators: genetic.evaluators.map(fn => fn.name)
  },
  data: [],
  rebuild: false,
};

const store = createStoreWithData(defaultConfig);


const App = (props) => {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div className="container">
            <Genetic functions={functions} library={genetic}/>
            <AppHeader/>
            <AppDrawer/>
            <AppBody/>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
}

export default App;