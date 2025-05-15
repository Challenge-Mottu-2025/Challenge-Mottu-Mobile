import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import colors from '../constants/colors';

export default function RegisterScreen({ navigation }) {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [patio, setPatio] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!modelo || !placa || !patio) {
      setMessage('Preencha todos os campos');
      return;
    }

    const placaKey = placa.toUpperCase().replace(/\s/g, '');
    const existing = await AsyncStorage.getItem(placaKey);

    if (existing) {
      setMessage('Moto já cadastrada!');
    } else {
      const motoData = { modelo, placa: placaKey, patio };
      await AsyncStorage.setItem(placaKey, JSON.stringify(motoData));
      setMessage('Moto cadastrada com sucesso!');
      setTimeout(() => navigation.navigate('Home'), 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Moto</Text>

      <Input
        value={placa}
        onChangeText={setPlaca}
        placeholder="Placa da moto"
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Modelo da Moto</Text>
      <Picker selectedValue={modelo} onValueChange={setModelo} style={styles.picker}>
        <Picker.Item label="Selecione um modelo" value="" />
        <Picker.Item label="Mottu Sport" value="Mottu Sport" />
        <Picker.Item label="Mottu E" value="Mottu E" />
        <Picker.Item label="Mottu Pop" value="Mottu Pop" />
      </Picker>

      <Text style={styles.label}>Pátio</Text>
      <Picker selectedValue={patio} onValueChange={setPatio} style={styles.picker}>
        <Picker.Item label="Selecione um pátio" value="" />
        <Picker.Item label="Mottu Butantã" value="Mottu Butantã" />
        <Picker.Item label="Mottu Limão" value="Mottu Limão" />
        <Picker.Item label="Mottu Lapa" value="Mottu Lapa" />
        <Picker.Item label="Mottu Santo Amaro" value="Mottu Santo Amaro" />
        <Picker.Item label="Mottu Tatuapé" value="Mottu Tatuapé" />
        <Picker.Item label="Mottu Santana" value="Mottu Santana" />
        <Picker.Item label="Mottu Penha" value="Mottu Penha" />
        <Picker.Item label="Mottu Mooca" value="Mottu Mooca" />
        <Picker.Item label="Mottu São Mateus" value="Mottu São Mateus" />
        <Picker.Item label="Mottu Capão Redondo" value="Mottu Capão Redondo" />
      </Picker>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Button title="Cadastrar Moto" onPress={handleRegister} />
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
  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
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
