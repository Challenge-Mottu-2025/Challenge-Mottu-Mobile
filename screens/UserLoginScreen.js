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

export default function UserLoginScreen({ navigation }) {
  const { login } = useAuth();
  const { theme } = useTheme();

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    setErr('');
    setSubmitting(true);
    const ok = await login(cpf.replace(/\D/g, ''), senha);
    setSubmitting(false);
    if (!ok) setErr('CPF ou senha inválidos.');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Entrar
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
          keyboardType="numeric"
          placeholder="CPF (somente números)"
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
          placeholder="Senha"
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {err ? <Text style={styles.error}>{err}</Text> : null}

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
              Login
            </Text>
          )}
        </Pressable>

        <Pressable onPress={() => navigation.navigate('RegisterUser')}>
          <Text
            style={{
              color: theme.colors.primary,
              marginTop: 20,
              fontWeight: '600'
            }}
          >
            Criar conta
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