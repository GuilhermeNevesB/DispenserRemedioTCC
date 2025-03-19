import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [loadingAuth, setLoadingAuth] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const currentRoute = navigation.getCurrentRoute();
    console.log('Tela atual:', currentRoute?.name);
    const unsubscribe = auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        setUser({
          email: userAuth.email,
          name: userAuth.displayName || 'Usuário',
          status: 'Ativo',
          uid: userAuth.uid,
        });
        //nao permite voltar

        if (currentRoute?.name !== 'SignUp') {
          navigation.reset({
            index: 0,
            routes: [{name: 'AppRoutes'}],
          });
        }

        //     navigation.navigate('AppRoutes'); nao habilitar
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
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setLoadingAuth(false);
      //verificar questao de voltar com botao direiro
      navigation.reset({
        index: 0,
        routes: [{name: 'AppRoutes'}],
      });

      //navigation.navigate('AppRoutes');
    } catch (error) {
      setLoadingAuth(false);
      if (error.name === 'TypeError') {
        Alert.alert('', 'Ops! Você esqueceu de preencher os campos');
      }
      if (error.name === 'Error') {
        Alert.alert('', 'Ops! Nome ou senha estão incorretos');
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
