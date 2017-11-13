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

/**
 * Default, empty configuration.
 */
const defaultConfig = {
  // If locked, global configuration cannot be edited.
  ui: {
    displayDrawer: false,
    viewMode: 'InstancesConfiguration',
  },
  instanceConfigurations: [],
  generation: 0,
  data: [],
};

const store = createStoreWithData(defaultConfig);


const App = (props) => {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Genetic>
            <AppHeader/>
            <AppDrawer/>
            <AppBody/>
          </Genetic>
        </Provider>
      </MuiThemeProvider>
    );
}

export default App;