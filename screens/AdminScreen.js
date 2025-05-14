import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';
import { Picker } from '@react-native-picker/picker';

export default function AdminScreen() {
  const [users, setUsers] = useState({});
  const [editingCpf, setEditingCpf] = useState(null);
  const [newCpf, setNewCpf] = useState("");

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

  const loadUsers = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(keys);
    const data = Object.fromEntries(stores.map(([k, v]) => [k, JSON.parse(v)]));
    setUsers(data);
  };

  const handleUpdate = async (cpf) => {
    try {
      await AsyncStorage.setItem(cpf, JSON.stringify(users[cpf]));
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao atualizar usuário.');
    }
  };

  const handleDelete = async (cpf) => {
    try {
      await AsyncStorage.removeItem(cpf);
      setUsers((prev) => {
        const updated = { ...prev };
        delete updated[cpf];
        return updated;
      });
      Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao excluir usuário.');
    }
  };

  const handleChange = (cpf, field, value) => {
    setUsers((prev) => ({
      ...prev,
      [cpf]: {
        ...prev[cpf],
        [field]: value,
      },
    }));
  };

  const handleCpfChange = async (oldCpf, newCpf) => {
    if (oldCpf === newCpf) {
      Alert.alert("Erro", "O CPF novo não pode ser igual ao CPF atual.");
      return;
    }

    try {
      const userData = { ...users[oldCpf], cpf: newCpf };
      await AsyncStorage.removeItem(oldCpf);
      await AsyncStorage.setItem(newCpf, JSON.stringify(userData));

      setUsers((prev) => {
        const updatedUsers = { ...prev };
        delete updatedUsers[oldCpf];
        updatedUsers[newCpf] = userData;
        return updatedUsers;
      });

      setEditingCpf(null);
      setNewCpf("");
      Alert.alert('Sucesso', 'CPF alterado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao alterar CPF.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="🔄 Carregar usuários salvos" onPress={loadUsers} />
      {Object.entries(users).map(([cpf, info]) => (
        <View key={cpf} style={styles.userCard}>
          <Text style={styles.label}>📌 CPF: {cpf}</Text>

          {editingCpf === cpf ? (
            <View>
              <TextInput
                style={styles.input}
                value={newCpf}
                onChangeText={setNewCpf}
                placeholder="Novo CPF"
              />
              <Button title="Alterar CPF" onPress={() => handleCpfChange(cpf, newCpf)} />
              <Button title="Cancelar" onPress={() => setEditingCpf(null)} color="gray" />
            </View>
          ) : (
            <Button title="Alterar CPF" onPress={() => { setEditingCpf(cpf); setNewCpf(""); }} />
          )}

          <Text style={styles.label}>👤 Nome:</Text>
          <TextInput
            style={styles.input}
            value={info.nome}
            onChangeText={(text) => handleChange(cpf, 'nome', text)}
          />

          <Text style={styles.label}>🔑 Senha:</Text>
          <TextInput
            style={styles.input}
            value={info.senha}
            onChangeText={(text) => handleChange(cpf, 'senha', text)}
          />

          <Text style={styles.label}>🏍️ Modelo da Moto:</Text>
          <Picker
            selectedValue={info.modelo || modelos[0]}
            onValueChange={(value) => handleChange(cpf, 'modelo', value)}
            style={styles.picker}
          >
            {modelos.map((modelo) => (
              <Picker.Item key={modelo} label={modelo} value={modelo} />
            ))}
          </Picker>

          <Text style={styles.label}>🆔 Placa da Moto:</Text>
          <TextInput
            style={styles.input}
            value={info.placa || ''}
            onChangeText={(text) => handleChange(cpf, 'placa', text)}
            placeholder="Ex: ABC1D23"
          />

          <Text style={styles.label}>📍 Pátio:</Text>
          <Picker
            selectedValue={info.patio || patios[0]}
            onValueChange={(value) => handleChange(cpf, 'patio', value)}
            style={styles.picker}
          >
            {patios.map((patio) => (
              <Picker.Item key={patio} label={patio} value={patio} />
            ))}
          </Picker>

          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Button title="💾 Salvar" onPress={() => handleUpdate(cpf)} />
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Button title="🗑️ Excluir" color="#ff3b30" onPress={() => handleDelete(cpf)} />
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
  userCard: {
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