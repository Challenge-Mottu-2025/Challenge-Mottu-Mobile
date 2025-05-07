import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function Button({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary, 
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
