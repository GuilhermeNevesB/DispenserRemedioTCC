import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function Settings() {
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

  return (
    <View>
      <View>
        <TouchableOpacity onPress={loggout}>
          <Text> Deslogar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
