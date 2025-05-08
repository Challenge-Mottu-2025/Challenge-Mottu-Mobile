import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';
import colors from '../constants/colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-mottu.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Bem-vindo à Mottu</Text>
      <Text style={styles.subtitle}>Gestão inteligente do pátio</Text>

      <View style={styles.buttonsContainer}>
        <Button
          title="🚀 Login"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        />
        <Button
          title="📝 Registrar"
          onPress={() => navigation.navigate('Register')}
          style={[styles.button, styles.registerButton]}
        />
        <Button
          title="🛠 Área Admin"
          onPress={() => navigation.navigate('Admin')}
          style={[styles.button, styles.adminButton]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    marginVertical: 8,
  },
  registerButton: {
    backgroundColor: '#009432', // Verde escuro
  },
  adminButton: {
    backgroundColor: '#0652DD', // Azul escuro para destacar
  },
});
