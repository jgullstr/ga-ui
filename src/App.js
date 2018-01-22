import React from 'react';
import './App.css';

import 'typeface-roboto';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStoreWithData } from './store';

import AppDrawer from './components/App/AppDrawer';
import AppHeader from './components/App/AppHeader';
import AppBody from './components/App/AppBody';
import AppFooter from './components/App/AppFooter';
import Progress from './components/App/Progress';

import defaultConfig from './config';

const store = createStoreWithData(defaultConfig);

const App = (props) => {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Progress>
            <AppHeader/>
            <AppDrawer/>
            <AppBody/>
            <AppFooter/>
          </Progress>
        </Provider>
      </MuiThemeProvider>
    );
}

export default App;