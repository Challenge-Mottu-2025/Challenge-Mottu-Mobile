import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function Input(props) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#888"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    color: colors.text, // texto branco
    fontSize: 16,
  },
});
