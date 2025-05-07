import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import colors from '../constants/colors';

export default function LoginScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const data = await AsyncStorage.getItem(cpf);
    if (!data) {
      setMessage('Usuário não encontrado');
      return;
    }

    const user = JSON.parse(data);
    if (user.senha === senha) {
      setMessage('Login bem-sucedido!');
      setTimeout(() => navigation.navigate('Dashboard', { nome: user.nome }), 1500);
    } else {
      setMessage('Senha incorreta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Input value={cpf} onChangeText={setCpf} placeholder="CPF" keyboardType="numeric" />
      <Input value={senha} onChangeText={setSenha} placeholder="Senha" secureTextEntry />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
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
