import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../constants/colors';

export default function RegisterScreen({ navigation }) {
  const [modelo, setModelo] = useState(null);
  const [patio, setPatio] = useState(null);
  const [placa, setPlaca] = useState('');
  const [message, setMessage] = useState('');

  const [modeloOpen, setModeloOpen] = useState(false);
  const [patioOpen, setPatioOpen] = useState(false);

  const [modeloItems, setModeloItems] = useState([
    { label: 'Mottu Sport', value: 'Mottu Sport' },
    { label: 'Mottu E', value: 'Mottu E' },
    { label: 'Mottu Pop', value: 'Mottu Pop' },
  ]);

  const [patioItems, setPatioItems] = useState([
    { label: 'Mottu Butantã', value: 'Mottu Butantã' },
    { label: 'Mottu Limão', value: 'Mottu Limão' },
    { label: 'Mottu Lapa', value: 'Mottu Lapa' },
    { label: 'Mottu Santo Amaro', value: 'Mottu Santo Amaro' },
    { label: 'Mottu Tatuapé', value: 'Mottu Tatuapé' },
    { label: 'Mottu Santana', value: 'Mottu Santana' },
    { label: 'Mottu Penha', value: 'Mottu Penha' },
    { label: 'Mottu Mooca', value: 'Mottu Mooca' },
    { label: 'Mottu São Mateus', value: 'Mottu São Mateus' },
    { label: 'Mottu Capão Redondo', value: 'Mottu Capão Redondo' },
  ]);

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

  // Para evitar que dois dropdowns fiquem abertos simultaneamente
  useEffect(() => {
    if (modeloOpen) {
      setPatioOpen(false);
    }
  }, [modeloOpen]);

  useEffect(() => {
    if (patioOpen) {
      setModeloOpen(false);
    }
  }, [patioOpen]);

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
      <DropDownPicker
        open={modeloOpen}
        value={modelo}
        items={modeloItems}
        setOpen={setModeloOpen}
        setValue={setModelo}
        setItems={setModeloItems}
        placeholder="Selecione um modelo"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
      />

      <Text style={styles.label}>Pátio</Text>
      <DropDownPicker
        open={patioOpen}
        value={patio}
        items={patioItems}
        setOpen={setPatioOpen}
        setValue={setPatio}
        setItems={setPatioItems}
        placeholder="Selecione um pátio"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
      />

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
  dropdown: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dropDownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
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
