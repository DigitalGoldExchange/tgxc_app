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
import messaging from '@react-native-firebase/messaging';

function App() {

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);



  return (
    <Provider store={store}>
      <NavigationRoot />
    </Provider>
  );
}

export default App;
