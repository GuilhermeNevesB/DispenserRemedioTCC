import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [loadingAuth, setLoadingAuth] = useState(false);
  const navigation = useNavigation();
  //const [loading, setLoading] = useState(true); // Novo estado para carregamento inicial
  /*
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    //  navigation.navigate('AppRoutes');
    navigation.navigate('AppRoutes');
    return unsubscribe;
  }, []);
  */

  /*
  // Monitora mudanças no estado de autenticação
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        setUser({
          email: userAuth.email,
          nome: userAuth.displayName || 'Usuário',
          status: 'Ativo',
        });
        navigation.navigate('AppRoutes'); // Redireciona para a área logada
      } else {
        setUser(null);
      }
      setLoading(false); // Termina o carregamento inicial
    });

    return () => unsubscribe();
  }, []);
  */
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        setUser({
          email: userAuth.email,
          nome: userAuth.displayName || 'Usuário', // Carrega o nome corretamente
          status: 'Ativo',
        });
        navigation.navigate('AppRoutes'); // Redireciona para a área logada
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  async function handleSignIn(email, senha) {
    setLoadingAuth(true);
    try {
      await auth().signInWithEmailAndPassword(email, senha);
      //const userAuth = auth().currentUser;
      Alert.alert('Sucesso', 'Login realizado com sucesso!');

      // console.log('usuario', userAuth.displayName);
      /* setUser({
        email: email,
        status: 'Ativo',
        nome: userAuth.displayName,
      });
      */
      setLoadingAuth(false);

      navigation.navigate('AppRoutes');
    } catch (error) {
      setLoadingAuth(false);
      if (error.name === 'TypeError') {
        Alert.alert('Os campos nao podem estar vazios');
      }
      if (error.name === 'Error') {
        Alert.alert('Erro desconhecdio');
      } else {
        //Alert.alert('Erro', error.message);
        console.log('erro tipo ', error.message);
        console.log('erro name ', error.name);
        /*
    } catch(error => {
    if (error.code === 'auth/email-already-in-use') {
     Alert.alert('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
     Alert.alert('That email address is invalid!');
    }

    console.error(error);
  });

        */
      }
    }
  }

  return (
    <AuthContext.Provider value={{handleSignIn, user, loadingAuth}}>
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
