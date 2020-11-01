import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {CommonActions} from '@react-navigation/native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
function Splash(props) {
  useEffect(() => {
    setTimeout(async () => {
      const resetAction = CommonActions.reset({
          index: 0,
          routes: [
          {
              name: 'Login',
          },
          ],
      });
      props.navigation.dispatch(resetAction);
  }, 6050);
  });
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          width:screenWidth,
          height:screenheight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <Image
          source={require('../../assets/images/splash.gif')}
          style={{width: 94, height: 94}}
        />
      </View>
    </SafeAreaView>
  );
}
export default Splash;
