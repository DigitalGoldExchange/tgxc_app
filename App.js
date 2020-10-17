/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import NavigationRoot from './src/nav';
import {Provider} from 'react-redux';
import store from './src/store';


function App() {
  return (
    <Provider store={store}>
      <NavigationRoot />
    </Provider>
  );
}

export default App;
