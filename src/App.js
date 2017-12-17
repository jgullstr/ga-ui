import React from 'react';
import './App.css';

import 'typeface-roboto';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStoreWithData } from './store';
import genetic, {geneticOptions} from './genetic';

import Genetic from './components/Genetic/Genetic';
import AppDrawer from './components/App/AppDrawer';
import AppHeader from './components/App/AppHeader';
import AppBody from './components/App/AppBody';
import AppFooter from './components/App/AppFooter';
import Progress from './components/App/Progress';
console.log(genetic);
/**
 * Default, empty configuration.
 */
const globalConfiguration = {
  bitSize: 32,
  populationSize: 30,
  fn: Object.keys(geneticOptions.functions)[0],
  argRanges: genetic.functions[Object.keys(geneticOptions.functions)[0]].defaultRanges,
  evaluator: Object.keys(geneticOptions.evaluators)[0],
  initializer: Object.keys(geneticOptions.initializers)[0],
  locked: false,
  rebuild: false,
};

 const defaultConfig = {
  // If locked, global configuration cannot be edited.
  ui: {
    displayDrawer: false,
    viewMode: 'InstancesConfiguration',
  },
  globalConfiguration: globalConfiguration,
  instanceConfigurations: [],
  generation: 0,
  data: [],
};

const store = createStoreWithData(defaultConfig);

const App = (props) => {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            <AppHeader/>
            <AppDrawer/>
            <AppBody/>
            <AppFooter/>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
}

export default App;