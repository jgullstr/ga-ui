import React, { Component } from 'react';
import './App.css';

import 'typeface-roboto';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {createStoreWithData, actions} from './store';
import GlobalConfiguration from './components/GlobalConfiguration/GlobalConfiguration';
import genetic from './genetic';

const store = createStoreWithData({
  global: {
    bitSize: 18,
    function: 0,
    population: 0,
    evaluator: 0,
    initiator: 0,
  },
  functions: [
    {
      name: 'Square',
      fn: x => x**2,
    }
  ],
  instances: [],
  populations: [],
  library: genetic,
});
console.log(store.getState());

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div className="container">
            <header className="App-header">
              <AppBar title="Genetic algorithm evaluator"/>
            </header>
            <div className="content">
              <GlobalConfiguration/>
            </div>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;