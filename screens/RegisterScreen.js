import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import colors from '../constants/colors';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!nome || !cpf || !senha) {
      setMessage('Preencha todos os campos');
      return;
    }

    const existing = await AsyncStorage.getItem(cpf);
    if (existing) {
      setMessage('Usuário já registrado!');
    } else {
      await AsyncStorage.setItem(cpf, JSON.stringify({ nome, senha }));
      setMessage('Registrado com sucesso!');
      setTimeout(() => navigation.navigate('Login'), 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Input value={nome} onChangeText={setNome} placeholder="Nome completo" />
      <Input value={cpf} onChangeText={setCpf} placeholder="CPF" keyboardType="numeric" />
      <Input value={senha} onChangeText={setSenha} placeholder="Senha" secureTextEntry />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Button title="Registrar" onPress={handleRegister} />
      <Button title="← Voltar" onPress={() => navigation.navigate('Home')} style={styles.backButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  message: {
    color: colors.warning,
    textAlign: 'center',
    marginVertical: 10,
  },
  backButton: {
    marginTop: 20,
  },
});
