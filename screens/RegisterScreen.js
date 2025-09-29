import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Input from '../components/Input';
import Button from '../components/Button';
import { useTheme } from '../theme/ThemeContext';

export default function RegisterScreen({ navigation }) {
  const { theme, isDark } = useTheme();

  const [modelo, setModelo] = useState(null);
  const [patio, setPatio] = useState(null);
  const [placa, setPlaca] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' | 'success' | ''

  const [modeloOpen, setModeloOpen] = useState(false);
  const [patioOpen, setPatioOpen] = useState(false);

  const [modeloItems, setModeloItems] = useState([
    { label: 'Mottu Sport', value: 'Mottu Sport' },
    { label: 'Mottu E', value: 'Mottu E' },
    { label: 'Mottu Pop', value: 'Mottu Pop' }
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
    { label: 'Mottu Capão Redondo', value: 'Mottu Capão Redondo' }
  ]);

  const placaRegex = /^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/;

  const modeloIdMap = {
    'Mottu Sport': 1,
    'Mottu E': 2,
    'Mottu Pop': 3
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
      navigation.navigate('Opcoes', { moto: motoData });
    }
  };

  useEffect(() => {
    if (modeloOpen) setPatioOpen(false);
  }, [modeloOpen]);

  useEffect(() => {
    if (patioOpen) setModeloOpen(false);
  }, [patioOpen]);

  // Estilos dependentes do tema
  const themed = useMemo(() => {
    return {
      screenBg: {
        backgroundColor: theme.colors.background
      },
      title: {
        color: theme.colors.primary
      },
      label: {
        color: theme.colors.text
      },
      input: {
        borderColor: theme.colors.primary,
        backgroundColor: isDark ? theme.colors.card : theme.colors.backgroundAlt,
        color: theme.colors.text
      },
      dropdownBase: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border
      },
      dropdownContainer: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border
      },
      messageBox: (type) => {
        if (!type) return {};
        const errorColors = {
          bg: isDark ? '#3A181B' : '#FFEBEE',
          text: isDark ? '#FFA4A4' : '#C62828',
          border: isDark ? '#FF6B6B' : '#C62828'
        };
        const successColors = {
          bg: isDark ? '#143823' : '#E8F5E9',
          text: isDark ? '#7DFFB0' : '#2E7D32',
          border: isDark ? '#3DD681' : '#2E7D32'
        };
        const set = type === 'error' ? errorColors : successColors;
        return {
          backgroundColor: set.bg,
          color: set.text,
          borderColor: set.border
        };
      },
      buttonExtra: {
        shadowColor: '#000'
      }
    };
  }, [theme, isDark]);

  // Estilização de sombra usando tokens
  const shadowStyle = isDark ? theme.tokens.shadow.dark : theme.tokens.shadow.light;

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, themed.screenBg]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
        >
          <AntDesign name="caretleft" size={28} color={theme.colors.primary} />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={[styles.title, themed.title]}>Cadastro de Moto</Text>

            {/* Campo Placa */}
          <Input
            value={placa}
            onChangeText={setPlaca}
            placeholder="Placa da moto (ex: ABC-1234)"
            autoCapitalize="characters"
            maxLength={8}
            style={[styles.input, themed.input, shadowStyle]}
            keyboardType="default"
            placeholderTextColor={theme.colors.textSecondary}
          />

          <Text style={[styles.label, themed.label]}>Modelo da Moto</Text>
          <DropDownPicker
            open={modeloOpen}
            value={modelo}
            items={modeloItems}
            setOpen={setModeloOpen}
            setValue={setModelo}
            setItems={setModeloItems}
            placeholder="Selecione um modelo"
            style={[styles.dropdown, themed.dropdownBase, shadowStyle]}
            dropDownContainerStyle={[styles.dropDownContainer, themed.dropdownContainer]}
            listMode="MODAL"
            modalProps={{ animationType: 'slide' }}
            modalTitle="Selecione o modelo da moto"
            modalContentContainerStyle={{ backgroundColor: theme.colors.background }}
            textStyle={{ color: theme.colors.text }}
            placeholderStyle={{ color: theme.colors.textSecondary }}
            selectedItemLabelStyle={{ color: theme.colors.primary, fontWeight: '600' }}
          />

          <Text style={[styles.label, themed.label]}>Pátio</Text>
          <DropDownPicker
            open={patioOpen}
            value={patio}
            items={patioItems}
            setOpen={setPatioOpen}
            setValue={setPatio}
            setItems={setPatioItems}
            placeholder="Selecione um pátio"
            style={[styles.dropdown, themed.dropdownBase, shadowStyle]}
            dropDownContainerStyle={[styles.dropDownContainer, themed.dropdownContainer]}
            listMode="MODAL"
            modalProps={{ animationType: 'slide' }}
            modalTitle="Selecione o pátio"
            modalContentContainerStyle={{ backgroundColor: theme.colors.background }}
            textStyle={{ color: theme.colors.text }}
            placeholderStyle={{ color: theme.colors.textSecondary }}
            selectedItemLabelStyle={{ color: theme.colors.primary, fontWeight: '600' }}
          />

          {message ? (
            <Text
              style={[
                styles.message,
                themed.messageBox(messageType)
              ]}
            >
              {message}
            </Text>
          ) : null}

          <Button
            title="Cadastrar Moto"
            onPress={handleRegister}
            style={[styles.registerButton]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    padding: 30
  },
  backArrow: {
    paddingTop: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600'
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginTop: 5
  },
  dropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  dropDownContainer: {
    borderWidth: 1,
    borderRadius: 10
  },
  message: {
    marginTop: 28,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    fontWeight: '500'
  },
  registerButton: {
    marginTop: 32
  }
});