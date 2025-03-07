import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth';

//verificar como vai ser

export default function SignIn() {
  const {handleSignIn} = useContext(AuthContext);
  const navigation = useNavigation();
  //para login

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.Background}>
      <View style={styles.Container}>
        <Image
          style={styles.Logo}
          source={require('../../assets/remedio.png')}
        />

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
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>
        <TouchableOpacity
          style={styles.SubmitButton}
          activeOpacity={0.5}
          onPress={() => handleSignIn(email, senha)}>
          <Text style={styles.SubmitText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Link}>
          <Text
            style={styles.LinkText}
            onPress={() => navigation.navigate('SignUp')}>
            {' '}
            Criar uma conta{' '}
          </Text>
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
    width: 150,
    height: 150,
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
