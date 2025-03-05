import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();

  return (
    <View style={styles.Background}>
      <View style={styles.Container}>
        <Image style={styles.Logo} source={require('../../assets/Logo.png')} />

        <View style={styles.AreaInput}>
          <TextInput style={styles.Input} placeholder="Seu email" />
        </View>
        <View style={styles.AreaInput}>
          <TextInput style={styles.Input} placeholder="Sua senha" />
        </View>
        <TouchableOpacity style={styles.SubmitButton} activeOpacity={0.5}>
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
