import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';

import Input from '../components/Input';
import Button from '../components/Button';

import { formatCPF, registerUser } from '../utils/auth';

export default function RegisterScreen({ navigation }) {
  const { theme } = useTheme();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const themed = useMemo(() => {
    return {
      screenBg: {
        backgroundColor: theme.colors.background
      },
      title: {
        color: theme.colors.primary
      },
      label: {
        color: theme.colors.text,
        marginTop: 12,
        marginBottom: 6
      },
      messageBox: (type) => ({
        color: type === 'error' ? '#ff4d4f' : '#2ecc71',
        marginTop: 12,
        textAlign: 'center'
      }),
      input: {
        backgroundColor: theme.colors.card,
        color: theme.colors.text
      }
    };
  }, [theme]);

  const handleRegister = async () => {
    setMessage('');
    if (!nome.trim() || !cpf || !senha) {
      setMessageType('error');
      setMessage('Preencha todos os campos.');
      return;
    }
    if (senha.length < 4) {
      setMessageType('error');
      setMessage('Senha deve ter ao menos 4 caracteres.');
      return;
    }
    if (senha !== confirmSenha) {
      setMessageType('error');
      setMessage('As senhas não coincidem.');
      return;
    }

    const res = await registerUser({ cpf, nome, senha });
    if (!res.success) {
      setMessageType('error');
      setMessage(res.message);
      return;
    }

    setMessageType('success');
    setMessage('Usuário cadastrado com sucesso. Faça login.');
    setTimeout(() => navigation.navigate('LoginUser'), 1000);
  };

  const onChangeCPF = (text) => {
    setCpf(formatCPF(text));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.wrapper, themed.screenBg]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
        >
          <FontAwesome name="caret-left" size={28} color={theme.colors.primary} />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={[styles.title, themed.title]}>Cadastro de Usuário</Text>

          <Text style={themed.label}>Nome</Text>
          <Input
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome completo"
            style={[styles.input, themed.input]}
            placeholderTextColor={theme.colors.textSecondary}
          />

          <Text style={themed.label}>CPF</Text>
          <Input
            value={cpf}
            onChangeText={onChangeCPF}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            maxLength={14}
            style={[styles.input, themed.input]}
            placeholderTextColor={theme.colors.textSecondary}
          />

          <Text style={themed.label}>Senha</Text>
          <Input
            value={senha}
            onChangeText={setSenha}
            placeholder="Senha"
            secureTextEntry
            style={[styles.input, themed.input]}
            placeholderTextColor={theme.colors.textSecondary}
          />

          <Text style={themed.label}>Confirmar Senha</Text>
          <Input
            value={confirmSenha}
            onChangeText={setConfirmSenha}
            placeholder="Repita a senha"
            secureTextEntry
            style={[styles.input, themed.input]}
            placeholderTextColor={theme.colors.textSecondary}
          />

          {message ? (
            <Text style={[styles.message, themed.messageBox(messageType)]}>
              {message}
            </Text>
          ) : null}

          <Button title="Cadastrar" onPress={handleRegister} style={styles.button} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    padding: 24
  },
  backArrow: {
    paddingTop: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    marginBottom: 6
  },
  message: {
    marginTop: 8
  },
  button: {
    marginTop: 18
  }
});