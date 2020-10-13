import React from 'react';
import {Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import HomeScreen from '../screens/home';
import Screen2 from '../screens/screen2';
import Screen3 from '../screens/screen3';
import Screen4 from '../screens/screen4';

const TabNav = () => {
  return (
    <Tab.Navigator tabBarOptions={{activeBackgroundColor:'black', inactiveBackgroundColor:'black', style:{height:79.6}}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/images/tab/icHome24PxF.png')
                    : require('../assets/images/tab/icHome24Px.png')
                }
                style={{width: 20, height: 18}}
              />
            );
          },
          tabBarLabel: () => {
            return null;
            // return (
            //   <Text
            //     style={{
            //       textAlign: 'center',
            //       color: focused ? '#333333' : '#aaaaaa',
            //     }}>
            //     홈
            //   </Text>
            // );
          },
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/images/tab/icAccountBalanceWallet24PxF.png')
                    : require('../assets/images/tab/icAccountBalanceWallet24Px.png')
                }
                style={{width: 20, height: 18}}
              />
            );
          },
          tabBarLabel: () => {
            return null;
             
          },
        }}
      />
      <Tab.Screen
        name="Screen3"
        component={Screen3}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/images/tab/exchange2xF.png')
                    : require('../assets/images/tab/exchange2x.png')
                }
                style={{width: 20, height: 18}}
              />
            );
          },
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Screen4"
        component={Screen4}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/images/tab/icViewHeadline24PxF.png')
                    : require('../assets/images/tab/icViewHeadline24Px.png')
                }
                style={{width: 20, height: 18}}
              />
            );
          },
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
