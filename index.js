/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App.tsx';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store.js';
import {NativeModules} from 'react-native';
import {useEffect} from 'react';

// useEffect(() => {
  // if (__DEV__) {
  //   NativeModules.DevSettings.setIsDebuggingRemotely(true);
  // }
// }, []);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => Root);
