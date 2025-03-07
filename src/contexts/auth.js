import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  async function handleSignIn(email, senha) {
    try {
      await auth().signInWithEmailAndPassword(email, senha);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');

      // navigation.navigate('AppRoutes');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  return (
    <AuthContext.Provider value={{handleSignIn}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

/*

const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, senha);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');

      navigation.navigate('AppRoutes');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

*/
