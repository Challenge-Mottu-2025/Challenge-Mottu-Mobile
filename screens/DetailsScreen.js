import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';

export default function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Detalhes da Moto</Text>

      <View style={styles.card}>
        <Text style={styles.item}>🛵 Modelo: <Text style={styles.bold}>Mottu Sport 110i</Text></Text>
        <Text style={styles.item}>✅ Status: <Text style={styles.bold}>Disponível</Text></Text>
        <Text style={styles.item}>📍 Localização: <Text style={styles.bold}>Pátio Central</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 30,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: 8,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  item: {
    fontSize: 16,
    marginVertical: 6,
    color: colors.text,
  },
  bold: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});
