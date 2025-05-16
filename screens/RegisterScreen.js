import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function RegisterScreen({ navigation }) {
  const [modelo, setModelo] = useState(null);
  const [patio, setPatio] = useState(null);
  const [placa, setPlaca] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

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

  const placaRegex = /^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/;

  const modeloIdMap = {
    "Mottu Sport": 1,
    "Mottu E": 2,
    "Mottu Pop": 3
  };

  const handleRegister = async () => {
    const placaKey = placa.toUpperCase().replace(/\s/g, '');

    if (!modelo || !placaKey || !patio) {
      setMessageType('error');
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (!placaRegex.test(placaKey)) {
      setMessageType('error');
      setMessage('Placa inválida. Use o formato antigo (ABC-1234) ou Mercosul (ABC1D23).');
      return;
    }

    const existing = await AsyncStorage.getItem(placaKey);

    if (existing) {
      setMessageType('error');
      setMessage('Esta moto já está cadastrada!');
    } else {
      const motoData = {
        modelo,
        modeloId: modeloIdMap[modelo],
        placa: placaKey,
        patio
      };

      await AsyncStorage.setItem(placaKey, JSON.stringify(motoData));

      setMessageType('success');
      setMessage('Moto cadastrada com sucesso!');
      console.log(motoData);

      navigation.navigate('Opcoes', { moto: motoData });
    }
  };

  useEffect(() => {
    if (modeloOpen) setPatioOpen(false);
  }, [modeloOpen]);

  useEffect(() => {
    if (patioOpen) setModeloOpen(false);
  }, [patioOpen]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <AntDesign name="caretleft" size={28} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.title}>Cadastro de Moto</Text>

          <Input
            value={placa}
            onChangeText={setPlaca}
            placeholder="Placa da moto (ex: ABC-1234)"
            autoCapitalize="characters"
            maxLength={8}
            style={styles.input}
            keyboardType="default"
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
            listMode="MODAL"
            modalProps={{
              animationType: 'slide',
            }}
            modalTitle="Selecione o modelo da moto"
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
            listMode="MODAL"
            modalProps={{
              animationType: 'slide',
            }}
            modalTitle="Selecione o pátio"
          />

          {message ? (
            <Text style={[styles.message, messageType === 'error' ? styles.error : styles.success]}>
              {message}
            </Text>
          ) : null}

          <Button title="Cadastrar Moto" onPress={handleRegister} style={styles.registerButton} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 30,
  },
  backArrow: {
    paddingTop: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primary,
    padding: 15,
    marginTop: 5,
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropDownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  message: {
    marginTop: 27,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  error: {
    color: '#D32F2F',
    backgroundColor: '#FFCDD2',
    borderColor: '#D32F2F',
    borderWidth: 1,
  },
  success: {
    color: '#388E3C',
    backgroundColor: '#C8E6C9',
    borderColor: '#388E3C',
    borderWidth: 1,
  },
  registerButton: {
    marginTop: 30,
  },
});
