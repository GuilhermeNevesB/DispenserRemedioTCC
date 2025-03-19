import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import {AuthContext} from '../../contexts/auth';

import firestore from '@react-native-firebase/firestore';

export default function Register() {
  const [nomeRemedio, SetNomeRemedio] = useState('');
  const [quantidade, SetQuantidade] = useState('');
  const [quantDiaria, SetQuantDiaria] = useState('');
  const [horarioRemed, SetHorarioRemed] = useState('');
  const {user} = useContext(AuthContext);

  // async function register() {
  //   try {
  //     await firestore().collection('users').doc(user.uid).set({
  //       nomeRemedio: nomeRemedio,
  //       QuantidadePilulas: quantidade,
  //       QuantidadeDiaria: quantDiaria,
  //       HorarioRemedio: horarioRemed,
  //     });

  //     console.log('Cadastrado com sucesso');
  //   } catch (erro) {
  //     console.log('Erro ao cadastrar:', erro);
  //   }

  //   console.log(nomeRemedio);
  // }
  async function register() {
    await firestore()
      .collection(user.uid)
      .add({
        nomeRemedio: nomeRemedio,
        QuantidadePilulas: quantidade,
        QuantidadeDiaria: quantDiaria,
        HorarioRemedio: horarioRemed,
      })

      .then(() => {
        Alert.alert('Sucesso', 'Remedio cadastrado com sucesso!');
        SetNomeRemedio('');
        SetQuantidade('');
        SetQuantDiaria('');
        SetHorarioRemed('');
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/Logo.png')} />
        <Text style={styles.textheder}>Cadastrar Remedio</Text>
      </View>
      <View>
        <Text style={styles.label}>Nome do Remédio </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do remédio"
          value={nomeRemedio}
          onChangeText={text => SetNomeRemedio(text)}
        />
        <Text style={styles.label}>Quantidade de comprimidos </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade de comprimidos"
          value={quantidade}
          onChangeText={text => SetQuantidade(text)}
        />
        <Text style={styles.label}>Frequência Diária</Text>
        <TextInput
          style={styles.input}
          placeholder="DIgite quantas vezes ao dia"
          value={quantDiaria}
          onChangeText={text => SetQuantDiaria(text)}
        />
        <Text style={styles.label}>Horário do Remédio</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o horario do remédio"
          value={horarioRemed}
          onChangeText={text => SetHorarioRemed(text)}
        />
        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}> Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 75,
    height: 75,
    marginBottom: 15,
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  textheder: {
    fontSize: 20,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 30,
    textAlign: 'center',
  },
  label: {
    color: '#000',
    fontSize: 18,
    marginBottom: 4,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#3b3bdf',
    width: 300,

    marginTop: 20,

    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
