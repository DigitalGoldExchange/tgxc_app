import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import TabNav from './tab';
import HomeScreen from '../screens/home';
import Screen2 from '../screens/screen2';
import Screen3 from '../screens/screen3';
import Screen4 from '../screens/screen4';
import Login from '../screens/login';
import EmailAuthScreen from '../screens/auth/email';
import PasswordAuthScreen from '../screens/auth/password';
import SignUp from '../screens/auth/join_step1';
import JoinStep2 from '../screens/auth/join_step2';
import JoinStep3 from '../screens/auth/join_step3';
import JoinStep4 from '../screens/auth/join_step4';
import JoinStep5 from '../screens/auth/join_step5';
import Setting from '../screens/screen4/setting';

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="App" component={TabNav} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="Screen4" component={Screen4} />
        <Stack.Screen name="EmailAuthScreen" component={EmailAuthScreen} />
        <Stack.Screen name="PasswordAuthScreen" component={PasswordAuthScreen} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="JoinStep2" component={JoinStep2} />
        <Stack.Screen name="JoinStep3" component={JoinStep3} />
        <Stack.Screen name="JoinStep4" component={JoinStep4} />
        <Stack.Screen name="JoinStep5" component={JoinStep5} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
