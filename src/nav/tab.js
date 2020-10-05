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
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // tabBarIcon: ({focused}) => {
          //   return (
          //     <Image
          //       source={
          //         focused
          //           ? require('../assets/images/drawable-xxxhdpi/bottom_nav_01_active.png')
          //           : require('../assets/images/drawable-xxxhdpi/bottom_nav_01.png')
          //       }
          //       style={{width: 18, height: 18}}
          //     />
          //   );
          // },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  textAlign: 'center',
                  color: focused ? '#333333' : '#aaaaaa',
                }}>
                홈
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          // tabBarIcon: ({focused}) => {
          //   return (
          //     <Image
          //       source={
          //         focused
          //           ? require('../assets/images/drawable-xxxhdpi/bottom_nav_02_active.png')
          //           : require('../assets/images/drawable-xxxhdpi/bottom_nav_02.png')
          //       }
          //       style={{width: 18, height: 18}}
          //     />
          //   );
          // },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  textAlign: 'center',
                  color: focused ? '#333333' : '#aaaaaa',
                  // fontFamily: 'NanumSquareB',
                }}>
                화면2
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Screen3"
        component={Screen3}
        options={{
          // tabBarIcon: ({focused}) => {
          //   return (
          //     <Image
          //       source={
          //         focused
          //           ? require('../assets/images/drawable-xxxhdpi/bottom_nav_03_active.png')
          //           : require('../assets/images/drawable-xxxhdpi/bottom_nav_03.png')
          //       }
          //       style={{width: 18, height: 18}}
          //     />
          //   );
          // },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  textAlign: 'center',
                  color: focused ? '#333333' : '#aaaaaa',
                  // fontFamily: 'NanumSquareB',
                }}>
                화면3
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Screen4"
        component={Screen4}
        options={{
          // tabBarIcon: ({focused}) => {
          //   return (
          //     <Image
          //       source={
          //         focused
          //           ? require('../assets/images/drawable-xxxhdpi/bottom_nav_04_active.png')
          //           : require('../assets/images/drawable-xxxhdpi/bottom_nav_04.png')
          //       }
          //       style={{width: 18, height: 18}}
          //     />
          //   );
          // },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{
                  textAlign: 'center',
                  color: focused ? '#333333' : '#aaaaaa',
                  // fontFamily: 'NanumSquareB',
                }}>
                화면4
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
