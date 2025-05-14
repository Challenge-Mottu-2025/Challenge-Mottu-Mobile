import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';

export default function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🏍️ Sua Moto Exclusiva</Text>

      <View style={styles.card}>
        <Text style={styles.badge}>🔒 Exclusiva para você!</Text>

        <Text style={styles.item}>
          <Text style={styles.emoji}>🛵</Text> Modelo:{' '}
          <Text style={styles.value}>Mottu Sport 110i</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.emoji}>🔢</Text> Placa:{' '}
          <Text style={styles.value}>FNM9H36</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.emoji}>📍</Text> Pátio:{' '}
          <Text style={styles.value}>Mottu Butantã</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.emoji}>✅</Text> Status:{' '}
          <Text style={[styles.value, { color: '#2ecc71' }]}>Pronta para uso</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.accent,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  badge: {
    backgroundColor: '#ffeaa7',
    color: '#d35400',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginBottom: 14,
    color: colors.text,
  },
  emoji: {
    fontSize: 20,
    marginRight: 4,
  },
  value: {
    fontWeight: '600',
    color: colors.primary,
  },
});
