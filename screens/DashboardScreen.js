import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function DashboardScreen({ route }) {
  const { nome } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, {nome}!</Text>
      <Text style={styles.subtext}>Em breve: Mapeamento de motos...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  welcome: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
  subtext: { fontSize: 16, marginTop: 10, color: colors.text },
});
