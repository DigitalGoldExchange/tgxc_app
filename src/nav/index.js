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
import MemberInfo from '../screens/home/memberInfo';
import EmailAuthScreen from '../screens/auth/email';
import PasswordAuthScreen from '../screens/auth/password';
import PasswordNice from '../screens/auth/passwordNice';
import SignUp from '../screens/auth/join_step1';
import JoinStep2 from '../screens/auth/join_step2';
import JoinStep3 from '../screens/auth/join_step3';
import JoinStep4 from '../screens/auth/join_step4';
import JoinStep5 from '../screens/auth/join_step5';
import JoinNice from '../screens/auth/join_nice';
import EmailNice from '../screens/auth/emailNice';
import Setting from '../screens/screen4/setting';
import Deposit from '../screens/screen3/deposit';
import SecondAuth1 from '../screens/screen3/secondAuth1';
import SecondAuth from '../screens/screen3/secondAuth';
import Withdraw from '../screens/screen3/withdraw';
import Exchange from '../screens/screen3/exchange';
import LogOut from '../screens/home/logout';
import Alarm from '../screens/home/alarm';
import SignUpEng from '../screens/auth/signUpEng';
import SplashScreen from '../screens/splash';

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
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
        <Stack.Screen name="JoinNice" component={JoinNice} />
        <Stack.Screen name="EmailNice" component={EmailNice} />
        <Stack.Screen name="PasswordNice" component={PasswordNice} />
        <Stack.Screen name="Deposit" component={Deposit} />
        <Stack.Screen name="SecondAuth1" component={SecondAuth1} />
        <Stack.Screen name="SecondAuth" component={SecondAuth} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="MemberInfo" component={MemberInfo} />
        <Stack.Screen name="Exchange" component={Exchange} />
        <Stack.Screen name="LogOut" component={LogOut} />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="SignUpEng" component={SignUpEng} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
