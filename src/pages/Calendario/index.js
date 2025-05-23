import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';

export default function Calendario() {
  const [logs, setLogs] = useState([]);
  const [marked, setMarked] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  LocaleConfig.locales['pt-br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: 'Hoje',
  };
  LocaleConfig.defaultLocale = 'pt-br';

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('LogsDispenser')
      .onSnapshot(snapshot => {
        const log = snapshot.docs.map(doc => ({
          Data: doc.data().Data,
          NomeRemedio: doc.data().NomeRemedio,
          HorarioRetirada: doc.data().HorarioRetirada,
        }));
        setLogs(log);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (logs.length === 0) return;

    const newMarked = {};
    logs.forEach(log => {
      if (log.Data) {
        newMarked[log.Data] = {
          marked: true,
          selected: true,
          selectedColor: 'orange',
        };
      }
    });

    setMarked(newMarked);
  }, [logs]);

  return (
    <View>
      <Calendar
        markedDates={marked}
        onDayPress={day => setSelectedDate(day.dateString)}
        theme={{
          selectedDayBackgroundColor: 'orange',
          dotColor: 'orange',
          selectedDotColor: 'white',
        }}
      />

      {selectedDate && (
        <View style={styles.card}>
          <Text style={styles.title}>Informações do dia {selectedDate}:</Text>
          {logs.filter(log => log.Data === selectedDate).length === 0 ? (
            <Text style={styles.empty}>
              Nenhum registro encontrado para essa data.
            </Text>
          ) : (
            logs
              .filter(log => log.Data === selectedDate)
              .map((log, index) => (
                <View key={index}>
                  <Text style={styles.text}>Remédio: {log.NomeRemedio}</Text>
                  <Text style={styles.text}>
                    Horário Retirada: {log.HorarioRetirada}
                  </Text>
                </View>
              ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    flex: 1,
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
  empty: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
});
