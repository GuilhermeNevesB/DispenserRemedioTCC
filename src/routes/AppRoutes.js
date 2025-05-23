import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Report from '../pages/Report';
import Users from '../pages/Users';
import Register from '../pages/Register';
import History from '../pages/History';
import ViewRemedios from '../pages/ViewRemedios';
import Feather from 'react-native-vector-icons/Feather';
import Calendario from '../pages/Calendario';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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
        name="Report"
        component={Report}
        options={{
          tabBarIcon: renderTabIcon('home'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={Users}
        options={{
          tabBarIcon: renderTabIcon('users'),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// export default AppRoutes ;

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={AppRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: 'Cadastro de Remédio'}}
      />
      <Stack.Screen
        name="ViewRemedios"
        component={ViewRemedios}
        options={{headerShown: false}}
      />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Calendario" component={Calendario} />
    </Stack.Navigator>
  );
}
