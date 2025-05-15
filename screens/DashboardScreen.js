import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function DetailsScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState({});

  useEffect(() => {
    const loadUsers = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);
      const data = Object.fromEntries(stores.map(([k, v]) => [k, JSON.parse(v)]));
      setUsers(data);
    };

    loadUsers();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backWrapper}>
        <LinearGradient
          colors={['#ff7675', '#d63031']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Voltar</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.title}>🏍️ Motos Cadastradas</Text>

      {Object.entries(users).map(([cpf, user]) => (
        <View key={cpf} style={styles.card}>
          <Text style={styles.badge}>👤 CPF: {cpf}</Text>

          <Text style={styles.item}>
            <Text style={styles.emoji}>🧍</Text> Nome:{' '}
            <Text style={styles.value}>{user.nome}</Text>
          </Text>

          <Text style={styles.item}>
            <Text style={styles.emoji}>🛵</Text> Modelo:{' '}
            <Text style={styles.value}>{user.modelo || 'N/A'}</Text>
          </Text>

          <Text style={styles.item}>
            <Text style={styles.emoji}>🔢</Text> Placa:{' '}
            <Text style={styles.value}>{user.placa || 'N/A'}</Text>
          </Text>

          <Text style={styles.item}>
            <Text style={styles.emoji}>📍</Text> Pátio:{' '}
            <Text style={styles.value}>{user.patio || 'N/A'}</Text>
          </Text>

          <Text style={styles.item}>
            <Text style={styles.emoji}>✅</Text> Status:{' '}
            <Text style={[styles.value, { color: '#27ae60' }]}>Pronta para uso</Text>
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backWrapper: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#d1c4e9',
    color: '#512da8',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 100,
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.text,
  },
  emoji: {
    fontSize: 20,
  },
  value: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});
