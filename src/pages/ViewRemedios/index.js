import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';

export default function ViewRemedios() {
  const {user} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = firestore()
      .collection(user.uid)
      .onSnapshot(snapshot => {
        const remedios = snapshot.docs
          .filter(doc => doc.id !== 'users')
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

        setTasks(remedios);
      });

    return () => unsubscribe();
  }, [user]);

  const DeleteRemedio = async id => {
    firestore()
      .collection(user.uid)
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    console.log('teste para ver id ', id);
  };

  console.log('mostr tudo', tasks);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Remédios</Text>

      {tasks.length > 0 ? (
        tasks.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>Nome do Remédio: {item.nomeRemedio}</Text>
            <Text style={styles.text}>
              Horário(s) do(s) Remédio(s):
              {item.HorarioRemedio1} {item.HorarioRemedio2}{' '}
              {item.HorarioRemedio3} {item.HorarioRemedio4}
            </Text>
            <Text style={styles.text}>
              Quantidade Diária: {item.QuantidadeDiaria}
            </Text>
            <Text style={styles.text}>
              Quantidade de Pílulas: {item.QuantidadePilulas} unidade(s)
            </Text>

            <View style={styles.buttonRow}>
              {console.log('TASK:', tasks)}
              {/* BOTAO DE EDITAR
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => DeleteRemedio(item.id)}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#3b3bdf',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#df3b3b',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
});
