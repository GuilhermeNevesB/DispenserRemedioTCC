import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {AuthContext} from '../../contexts/auth';

import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/LogoOrig.png')}
        />
        <Text style={styles.texto}>Bem-vindo: {user.name}</Text>
        {/* <Text style={styles.texto}>Email: {user.email}</Text>
        <Text style={styles.texto}>Status: {user.status}</Text>
        <Text style={styles.texto}>senha: {user.uid}</Text>*/}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Cadastrar Remédio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ViewRemedios')}>
          <Text style={styles.buttonText}>Ver Remédios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonText}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Calendario')}>
          <Text style={styles.buttonText}>Calendário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Conexão de Rede</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom: 20,

    marginTop: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,

    marginTop: 20,
  },
  texto: {
    fontSize: 18,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 50, //esse
    paddingHorizontal: 20,
    marginTop: 40, //esse

    // width: '90%',
    backgroundColor: '#fff',
    padding: 80,
    borderRadius: 30,
    elevation: 3,
  },
  button: {
    backgroundColor: '#3b3bdf',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    maxWidth: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
