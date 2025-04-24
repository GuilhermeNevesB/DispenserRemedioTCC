import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Checkbox, RadioButton} from 'react-native-paper';

import {AuthContext} from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';

export default function Users() {
  const navigation = useNavigation();
  const [value, setValue] = useState(''); //botao fem ou masc
  const [checked, setChecked] = useState(false); //checka se tem alergia ou nao
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNas] = useState('');
  const [alergia, setAlergia] = useState('');
  const [peso, setPeso] = useState('');

  const [tasks, setTasks] = useState([]);

  const {user} = useContext(AuthContext);

  const [editavel, setEditavel] = useState(true); //editavel botao

  // const EstadoSexo = value;

  // setValue(EstadoSexo);

  //  setValue(EstadoSexo, 'valor');

  //console.log('tesde de id', tasks);
  //console.log('verificar aqui agora dnv', tasks?._data?.Alergia);
  //console.log('verificar aqui agora', checked);

  useEffect(() => {
    if (tasks?._data?.Alergia !== undefined) {
      setChecked(true);
    }
  }, [tasks]);

  useEffect(() => {
    function Sexo() {
      const sexo = tasks?._data?.Sexo;
      //  let SexoBD = '';
      switch (sexo) {
        case 'Masculino':
        case 'Feminino':
        case 'Outro':
          return sexo;
      }
    }
    if (tasks?._data?.Sexo && value === '') {
      setValue(Sexo());
    }
  }, [tasks, value]);

  useFocusEffect(
    useCallback(() => {
      const BuscaUsers = async () => {
        const userCollection = await firestore()
          .collection(user.uid)
          .doc('users')
          .get();

        setTasks(userCollection);
        //   setValue(EstadoSexo);
      };
      BuscaUsers();
    }, [user]),
  );

  function loggout() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        });
      })
      .catch(error => console.error('Sign out error:', error));
  }

  async function register() {
    if (nome === '' || dataNasc === '' || peso === '' || value === '') {
      Alert.alert('', 'Ops! Você esqueceu de preencher os campos');
    } else {
      try {
        await firestore().collection(user.uid).doc('users').set({
          Nome: nome,
          DataNascimento: dataNasc,
          Sexo: value,
          Alergia: alergia,
          Peso: peso,
        });

        console.log('passou aqui o edit ');

        Alert.alert('Sucesso', 'Perfil salvo com sucesso!');
        desativarEditavel();
        navigation.navigate('Home');

        // setTimeout(() => {
        //   navigation.reset({index: 0, routes: [{name: 'Home'}]});
        // }, 1000);

        setNome('');
        setDataNas('');
        setValue('');
        setAlergia('');
        setPeso('');
      } catch (erro) {
        console.log('Erro ao cadastrar:', erro);
      }
    }
  }
  const desativarEditavel = () => {
    setEditavel(false); // seta diretamente para false
  };
  const BottonEdit = () => {
    setEditavel(prev => !prev);
  };

  console.log('ver aqui', editavel);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../assets/Logo.png')}
          />
          <Text style={styles.textHeader}>Cadastro do Usuário Tomador</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder={tasks?._data?.Nome ?? 'Digite o Nome'}
            value={nome}
            onChangeText={text => setNome(text)}
            editable={editavel}
          />

          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder={tasks?._data?.DataNascimento ?? 'DD/MM/AA'}
            keyboardType="numeric"
            value={dataNasc}
            maxLength={8}
            onChangeText={Number => setDataNas(Number)}
            editable={editavel}
          />

          <Text style={styles.label}>Digite o peso</Text>
          <TextInput
            style={styles.input}
            placeholder={tasks?._data?.Peso ?? 'Digite o peso'}
            keyboardType="numeric"
            maxLength={3}
            value={peso}
            onChangeText={text => setPeso(text)}
            editable={editavel}
          />

          <Text style={styles.label}>Qual o sexo?</Text>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={styles.radioContainer}>
              <View style={styles.radioOption}>
                <RadioButton value="Feminino" />
                <Text>Feminino</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="Masculino" />
                <Text>Masculino</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="Outro" />
                <Text>Outro</Text>
              </View>
            </View>
          </RadioButton.Group>

          <View style={styles.alergiaContainer}>
            <Text style={styles.label}>Tem alergia?</Text>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
            />
          </View>

          {checked && (
            <TextInput
              style={styles.input}
              placeholder={tasks?._data?.Alergia ?? 'Digite a alergia'}
              value={alergia}
              onChangeText={text => setAlergia(text)}
              editable={editavel}
            />
          )}

          <TouchableOpacity style={styles.saveButton} onPress={register}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editButton} onPress={BottonEdit}>
            <Text style={styles.editSave}>Editar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loggoutButton} onPress={loggout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold',
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
  radioContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alergiaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#3b3bdf',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#006400',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 100,
    height: 40,
    alignSelf: 'center',
  },
  editSave: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loggoutButton: {
    marginTop: 20,
    marginLeft: 20,
    // backgroundColor: 'red',
    //  paddingVertical: 10,
    //  paddingHorizontal: 10,
    borderRadius: 10,
    //  alignItems: 'center',
    // width: 120,
    // height: 40,
    alignSelf: 'baseline',
  },
  logoutText: {
    textDecorationLine: 'underline',
  },
});
