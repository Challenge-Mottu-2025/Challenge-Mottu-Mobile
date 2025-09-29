import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../context/authContext';
import { useTheme } from '../theme/ThemeContext';

export default function UserRegisterScreen({ navigation }) {
  const { register } = useAuth();
  const { theme } = useTheme();

  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [nrCep, setNrCep] = useState('');
  const [senha, setSenha] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    setMsg('');
    if (senha !== confirm) {
      setMsg('Senhas não conferem.');
      return;
    }
    setSubmitting(true);
    const ok = await register({
      cpf: cpf.replace(/\D/g, ''),
      nome,
      senha,
      nrCep: nrCep || null
    });
    setSubmitting(false);
    if (!ok) setMsg('Erro ao registrar (CPF já existe?)');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Criar Conta
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border
            }
          ]}
          placeholder="CPF"
          keyboardType="numeric"
          placeholderTextColor={theme.colors.textSecondary}
          value={cpf}
          onChangeText={setCpf}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border
            }
          ]}
          placeholder="Nome"
          placeholderTextColor={theme.colors.textSecondary}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border
            }
          ]}
          placeholder="CEP (opcional)"
          keyboardType="numeric"
          placeholderTextColor={theme.colors.textSecondary}
          value={nrCep}
          onChangeText={setNrCep}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border
            }
          ]}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor={theme.colors.textSecondary}
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border
            }
          ]}
          placeholder="Confirmar Senha"
          secureTextEntry
          placeholderTextColor={theme.colors.textSecondary}
          value={confirm}
          onChangeText={setConfirm}
        />

        {msg ? <Text style={styles.error}>{msg}</Text> : null}

        <Pressable
          onPress={onSubmit}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.colors.primary },
            pressed && { opacity: 0.85 }
          ]}
        >
          {submitting ? (
            <ActivityIndicator color={theme.colors.primaryContrast} />
          ) : (
            <Text
              style={{
                color: theme.colors.primaryContrast,
                fontWeight: '700'
              }}
            >
              Registrar
            </Text>
          )}
        </Pressable>

        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: theme.colors.primary,
              marginTop: 20,
              fontWeight: '600'
            }}
          >
            Já tenho conta
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6
  },
  error: {
    color: 'tomato',
    marginBottom: 8,
    textAlign: 'center'
  }
});