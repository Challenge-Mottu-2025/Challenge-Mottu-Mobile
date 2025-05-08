import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import colors from '../constants/colors';

export default function DashboardScreen({ route, navigation }) {
  const { nome } = route.params;

  const handleGoBack = () => {
    navigation.navigate('Login');  // Navega diretamente para a tela de Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, {nome}!</Text>
      <Text style={styles.subtext}>Em breve: Mapeamento de motos...</Text>

      {/* Botão para voltar para a tela de Login */}
      <Button title="Voltar ao Menu" onPress={handleGoBack} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  welcome: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
  subtext: { fontSize: 16, marginTop: 10, color: colors.text },
});
