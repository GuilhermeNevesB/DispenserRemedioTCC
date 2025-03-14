import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import {AuthContext} from '../../contexts/auth';

export default function Home() {
  const {user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image style={styles.Logo} source={require('../../assets/Logo.png')} />
      </View>
      <View style={styles.vwtexto}>
        <Text style={styles.texto}>Bem vindo: {user.name}</Text>
        <Text> testando os debaixo</Text>
        <Text>Bem vindo: {user.email}</Text>
        <Text>Bem vindo: {user.status}</Text>
      </View>
      <View style={styles.bot}>
        <TouchableOpacity>
          <Text style={styles.texbot}> Teste 1 </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>testo 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    marginTop: 40,
  },
  Logo: {
    marginBottom: 25,
    width: 75,
    height: 75,
  },
  vwtexto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  texto: {
    fontSize: 20,
  },
  bot: {
    justifyContent: 'center',

    alignItems: 'flex-start',
    marginLeft: 30,
    marginTop: 30,
  },
  texbot: {
    fontSize: 25,
  },
});
