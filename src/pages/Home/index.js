import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {AuthContext} from '../../contexts/auth';

export default function Home() {
  const {user} = useContext(AuthContext);

  return (
    <View>
      <Text>Teste do que vc vai fazer </Text>
      <Text>Nome: {user.nome}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
}
