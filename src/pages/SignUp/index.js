//verificar se vamos deixar a funçao
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
//verificar

import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../contexts/auth';

export default function SignUp() {
  //context
  const navigation = useNavigation();

  //load pagina

  const {loadingAuth} = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignUp = async () => {
    if (nome === '' || email === '' || senha === '') return;
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        senha,
      );
      //testar ainda
      navigation.goBack();

      await userCredential.user.updateProfile({
        displayName: nome,
      });
      // Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.Background}>
      <View style={styles.Container}>
        <View style={styles.AreaInput}>
          <TextInput
            style={styles.Input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>
        <View style={styles.AreaInput}>
          <TextInput
            style={styles.Input}
            placeholder="Seu email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.AreaInput}>
          <TextInput
            style={styles.Input}
            placeholder="Sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.SubmitButton} onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <Text style={styles.SubmitText}>Cadastrar </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#F0f4ff',
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Logo: {
    marginBottom: 25,
  },
  AreaInput: {
    flexDirection: 'row',
  },
  Input: {
    backgroundColor: '#fff',
    width: '90%',
    fontSize: 17,
    padding: 10,
    borderRadius: 8,
    color: '#121212',
    marginBottom: 15,
  },
  SubmitButton: {
    width: '90%',
    height: 45,
    borderRadius: 8,
    backgroundColor: '#3b3bdf',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubmitText: {
    fontSize: 20,
    color: '#fff',
  },
  Link: {
    marginTop: 10,
    marginBottom: 10,
  },
  LinkText: {
    color: '#171717',
  },
});
