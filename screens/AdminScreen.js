import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';
import { Picker } from '@react-native-picker/picker';

export default function AdminScreen() {
  const [motos, setMotos] = useState({});

  const modelos = ['Mottu Sport', 'Mottu E', 'Mottu Pop'];
  const patios = [
    'Mottu Butantã',
    'Mottu Limão',
    'Mottu Lapa',
    'Mottu Santo Amaro',
    'Mottu Tatuapé',
    'Mottu Santana',
    'Mottu Penha',
    'Mottu Mooca',
    'Mottu São Mateus',
    'Mottu Capão Redondo',
  ];

  const loadMotos = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(keys);
    const data = Object.fromEntries(stores.map(([k, v]) => [k, JSON.parse(v)]));
    setMotos(data);
  };

  const handleUpdate = async (key) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(motos[key]));
      Alert.alert('Sucesso', 'Moto atualizada com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao atualizar moto.');
    }
  };

  const handleDelete = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      setMotos((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
      Alert.alert('Sucesso', 'Moto excluída com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao excluir moto.');
    }
  };

  const handleChange = (key, field, value) => {
    setMotos((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="🔄 Carregar Motos Registradas" onPress={loadMotos} />
      {Object.entries(motos).map(([key, info]) => (
        <View key={key} style={styles.card}>
          <Text style={styles.label}>🆔 ID: {key}</Text>

          <Text style={styles.label}>🏍️ Modelo da Moto:</Text>
          <Picker
            selectedValue={info.modelo || modelos[0]}
            onValueChange={(value) => handleChange(key, 'modelo', value)}
            style={styles.picker}
          >
            {modelos.map((modelo) => (
              <Picker.Item key={modelo} label={modelo} value={modelo} />
            ))}
          </Picker>

          <Text style={styles.label}>📋 Placa da Moto:</Text>
          <TextInput
            style={styles.input}
            value={info.placa || ''}
            onChangeText={(text) => handleChange(key, 'placa', text)}
            placeholder="Ex: ABC1D23"
          />

          <Text style={styles.label}>📍 Pátio:</Text>
          <Picker
            selectedValue={info.patio || patios[0]}
            onValueChange={(value) => handleChange(key, 'patio', value)}
            style={styles.picker}
          >
            {patios.map((patio) => (
              <Picker.Item key={patio} label={patio} value={patio} />
            ))}
          </Picker>

          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Button title="💾 Salvar" onPress={() => handleUpdate(key)} />
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Button title="🗑️ Excluir" color="#ff3b30" onPress={() => handleDelete(key)} />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
