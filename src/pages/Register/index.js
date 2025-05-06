import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import {AuthContext} from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';

export default function Register() {
  const [nomeRemedio, SetNomeRemedio] = useState('');
  const [quantidade, SetQuantidade] = useState('');
  const [quantDiaria, SetQuantDiaria] = useState('');
  const [horariosRemed, setHorariosRemed] = useState(['', '', '', '']);
  //const [horarioRemed, SetHorarioRemed] = useState('');

  const {user} = useContext(AuthContext);

  async function register() {
    if (nomeRemedio === '' || quantidade === '' || quantDiaria === '') {
      Alert.alert('', 'Ops! Você esqueceu de preencher os campos');
    } else {
      await firestore()
        .collection(user.uid)
        .add({
          nomeRemedio: nomeRemedio,
          QuantidadePilulas: quantidade,
          QuantidadeDiaria: quantDiaria,

          HorarioRemedio1: horariosRemed[0],
          HorarioRemedio2: horariosRemed[1],
          HorarioRemedio3: horariosRemed[2],
          HorarioRemedio4: horariosRemed[3],
        })
        .then(() => {
          Alert.alert('Sucesso', 'Remédio cadastrado com sucesso!');
          SetNomeRemedio('');
          SetQuantidade('');
          SetQuantDiaria('');
        });
    }
  }

  const frequen = () => {
    const inputs = [];
    if (quantDiaria <= 4) {
      for (let i = 0; i < quantDiaria; i++) {
        inputs.push(
          <View key={i}>
            <Text style={styles.label}>Horário do Remédio</Text>
            <TextInput
              style={styles.input}
              placeholder={`Digite o horário do ${i + 1}° remédio `}
              //value={horarioRemed[i]}
              onChangeText={text => {
                const novosHorarios = [...horariosRemed];
                novosHorarios[i] = text;
                setHorariosRemed(novosHorarios);
              }}
            />
          </View>,
        );
      }
    } else {
      Alert.alert(
        'Limite atingido',
        'Você pode adicionar no máximo 4 horarios.',
      );
      SetQuantDiaria('');
    }

    return inputs;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../assets/Logo.png')}
          />
          <Text style={styles.textHeader}>Cadastrar Remédio</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Nome do Remédio</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do remédio"
            value={nomeRemedio}
            onChangeText={text => SetNomeRemedio(text)}
          />
          <Text style={styles.label}>Quantidade de comprimidos</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a quantidade de comprimidos"
            value={quantidade}
            keyboardType="numeric"
            onChangeText={text => SetQuantidade(text)}
          />
          <Text style={styles.label}>Frequência Diária</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite quantas vezes ao dia"
            keyboardType="numeric"
            value={quantDiaria}
            onChangeText={text => SetQuantDiaria(text)}
          />
          <View>
            {quantDiaria >= 1 && frequen()}
            {/* 
            <Text style={styles.label}>Horário do Remédio</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o horário do remédio"
              value={horarioRemed}
              onChangeText={text => SetHorarioRemed(text)}
            /> */}
          </View>

          <TouchableOpacity style={styles.button} onPress={register}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 15,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  form: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#3b3bdf',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
