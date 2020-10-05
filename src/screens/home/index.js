import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text} from 'react-native';

function HomeScreen(props) {
  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <Text>Home</Text>
    </SafeAreaView>
  );
}

export default HomeScreen;
