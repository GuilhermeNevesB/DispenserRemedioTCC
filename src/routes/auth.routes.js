import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import AppRoutes from './AppRoutes';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: '#3b3dbf',
            borderBottomWidth: 1,
            borderBottomColor: '#00b94a',
          },
          headerTintColor: '#fff',
          headerTitle: 'Voltar??????',
        }}
      />
      <AuthStack.Screen
        name="AppRoutes"
        component={AppRoutes}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
