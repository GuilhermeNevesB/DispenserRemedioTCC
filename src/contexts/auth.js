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
      const userAuth = auth().currentUser;
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      // console.log('usuario', userAuth.displayName);
      setUser({
        email: email,
        status: 'Ativo',
        nome: userAuth.displayName,
      });

      navigation.navigate('AppRoutes');
    } catch (error) {
      if (error.name === 'TypeError') {
        Alert.alert('Os campos nao podem estar vazios');
      }
      if (error.name === 'Error') {
        Alert.alert('Erro desconhecdio');
      } else {
        //Alert.alert('Erro', error.message);
        console.log('erro tipo ', error.message);
        console.log('erro name ', error.name);
      }
    }
  }

  return (
    <AuthContext.Provider value={{handleSignIn, user}}>
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
