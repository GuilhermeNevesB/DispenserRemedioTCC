import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
//verificar
//auth().initializeApp();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#f0f4ff" barStyle="dark-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
