import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';

export default function ViewRemedios() {
  const {user} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const verRemedios = async () => {
      //veriicar se mantenho
      if (!user?.uid) return;

      const userCollection = await firestore().collection(user.uid).get();
      const remedios = userCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(remedios);
    };

    verRemedios();
  }, [user]);

  return (
    <View>
      <Text>Lista de Remédios:</Text>
      {tasks.length > 0 ? (
        tasks.map((item, index) => (
          <View key={index} style={{marginBottom: 10}}>
            <Text>ID: {item.id}</Text>
            <Text>Nome: {item.nomeRemedio}</Text>
            <Text>Horário: {item.HorarioRemedio}</Text>
            <Text>Quantidade Diária: {item.QuantidadeDiaria}</Text>
            <Text>Quantidade de Pílulas: {item.QuantidadePilulas}</Text>
          </View>
        ))
      ) : (
        <Text>Nenhum remédio encontrado.</Text>
      )}
    </View>
  );
}
