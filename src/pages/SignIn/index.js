import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
} from 'react-native';

export default function SignIn() {
  return (
    <View style={styles.Background}>
      <KeyboardAvoidingView style={styles.Container}>
        <Image style={styles.Logo} source={require('../../assets/Logo.png')} />

        <View style={styles.AreaInput}>
          <TextInput style={styles.Input} placeholder="Seu email" />
        </View>
        <View style={styles.AreaInput}>
          <TextInput style={styles.Input} placeholder="Sua senha" />
        </View>
      </KeyboardAvoidingView>
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
});
