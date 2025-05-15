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
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Botão Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backWrapper}>
        <LinearGradient
          colors={['#25E348FF', '#07C744DA']}
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


          <View style={styles.infoRow}>
            <Text style={styles.emoji}>🛵</Text>
            <Text style={styles.label}>Modelo:</Text>
            <Text style={styles.value}>{user.modelo || 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.emoji}>🔢</Text>
            <Text style={styles.label}>Placa:</Text>
            <Text style={styles.value}>{user.placa || 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.emoji}>📍</Text>
            <Text style={styles.label}>Pátio:</Text>
            <Text style={styles.value}>{user.patio || 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.emoji}>✅</Text>
            <Text style={[styles.value, styles.status]}>Pronta para uso</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backWrapper: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 25,
    elevation: 5,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },
  backText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 26,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  emoji: {
    fontSize: 22,
    marginRight: 12,
  },
  label: {
    fontSize: 18,
    color: '#555',
    width: 80,
  },
  value: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.primary,
    flexShrink: 1,
  },
  status: {
    color: '#27ae60',
  },
});
