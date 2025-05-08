import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

export default function AdminScreen() {
  const [users, setUsers] = useState({});
  const [editingCpf, setEditingCpf] = useState(null);  // Estado para controlar o CPF sendo editado
  const [newCpf, setNewCpf] = useState("");  // Estado para o novo CPF

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

  const handleDelete = (cpf) => {
    deleteUser(cpf, setUsers);  // Chama a função de exclusão
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
      const userData = { ...users[oldCpf], cpf: newCpf };  // Atualiza os dados com o novo CPF
      await AsyncStorage.removeItem(oldCpf);  // Remove o CPF antigo
      await AsyncStorage.setItem(newCpf, JSON.stringify(userData));  // Salva com o novo CPF
      
      setUsers((prev) => {
        const updatedUsers = { ...prev };
        delete updatedUsers[oldCpf];  // Remove o usuário antigo do estado
        updatedUsers[newCpf] = userData;  // Adiciona o novo usuário no estado
        return updatedUsers;
      });

      setEditingCpf(null);  // Fecha a edição do CPF
      setNewCpf("");  // Limpa o campo do CPF

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
          
          {/* Adiciona a opção de alterar o CPF */}
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
            // REMOVE secureTextEntry para visualizar a senha
          />
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
