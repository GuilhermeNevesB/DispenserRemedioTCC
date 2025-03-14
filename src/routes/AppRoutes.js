import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const renderTabIcon =
  name =>
  ({color, size}) =>
    <Feather name={name} color={color} size={size} />;

function AppRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: renderTabIcon('home'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: renderTabIcon('archive'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: renderTabIcon('users'),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppRoutes;
