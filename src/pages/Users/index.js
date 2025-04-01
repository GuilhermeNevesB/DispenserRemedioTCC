import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  CheckBox,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function Users() {
  const navigation = useNavigation();
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

  //   return (
  //     <View>
  //       <View>
  //         <TouchableOpacity onPress={loggout}>
  //           <Text> Deslogar</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/Logo.png')} />
        <Text style={styles.textheder}>Cadastrar Remedio</Text>
      </View>
      <View>
        <Text style={styles.label}>Digite Seu nome Completo </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do remédio"
          // value={nomeRemedio}
          //  onChangeText={text => SetNomeRemedio(text)}
        />
        <Text style={styles.label}>Digite Seu nome Completo </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do remédio"
          // value={nomeRemedio}
          //  onChangeText={text => SetNomeRemedio(text)}
        />
        <Text style={styles.label}>Digite Seu nome Completo </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do remédio"
          // value={nomeRemedio}
          //  onChangeText={text => SetNomeRemedio(text)}
        />
        <CheckBox />
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
    backgroundColor: 'red',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    backgroundColor: 'blue',
  },
  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 30,
    textAlign: 'center',
  },
});
