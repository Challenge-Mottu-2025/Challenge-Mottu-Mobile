import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';
import colors from '../constants/colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo-mottu.png')} style={styles.logo} />

      <Text style={styles.title}>Bem-vindo à Mottu</Text>

      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      />
      <Button
        title="Registrar"
        onPress={() => navigation.navigate('Register')}
        style={[styles.button, styles.registerButton]}
      />
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
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: colors.text,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: '#009432', // tom de verde escuro para variar
  },
});
