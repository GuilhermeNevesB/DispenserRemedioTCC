import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';

export default function History() {
  const {user} = useContext(AuthContext);

  const [logs, setLogs] = useState([]);

  //const user = await firestore().collection('Users').doc('ABC').get();

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = firestore()
      .collection('LogsDispenser')
      .onSnapshot(snapshot => {
        const log = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLogs(log);
      });

    return () => unsubscribe();
  }, [user]);

  console.log('teste de user ', logs);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Histórico de Remédios</Text>

      {logs.length > 0 ? (
        logs.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>Nome do Remédio: {item.NomeRemedio}</Text>
            <Text style={styles.text}>Status: {item.Status} </Text>
            <Text style={styles.text}>
              Quantidade restante: {item.CompRestante}
            </Text>
            <Text style={styles.text}>
              Horario Remedio: {item.HorarioRemedio}
            </Text>
            <Text style={styles.text}>
              Horario Retirado: {item.HorarioRetirada}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>Nenhum remédio encontrado.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});
