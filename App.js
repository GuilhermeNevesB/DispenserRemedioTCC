import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

//import Routes from './src/routes';
import AuthRoutes from './src/routes/auth.routes';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#f0f4ff" barStyle="dark-content" />
        <AuthRoutes />
      </AuthProvider>
    </NavigationContainer>
  );
}
