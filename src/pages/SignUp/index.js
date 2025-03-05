//verificar se vamos deixar a funçao
import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

//verificar
import {AuthContext} from '../../contexts/auth';

export default function SignUp() {
  //verificar
  const {user} = useContext(AuthContext);

  return (
    <View style={styles.Background}>
      <View style={styles.Container}>
        <View style={styles.AreaInput}>
          <TextInput style={styles.Input} placeholder="Nome" />
        </View>
        <View style={styles.AreaInput}>
          <TextInput style={styles.Input} placeholder="Seu email" />
        </View>
        <View style={styles.AreaInput}>
          <TextInput style={styles.Input} placeholder="Sua senha" />
        </View>
        <TouchableOpacity style={styles.SubmitButton}>
          <Text style={styles.SubmitText}>Cadastrarrrrrr </Text>
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
