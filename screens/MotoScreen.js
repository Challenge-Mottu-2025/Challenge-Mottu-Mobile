import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from "../constants/colors";

export default function MotosScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { motos } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <AntDesign name="caretleft" size={28} color={colors.primary} />
      </TouchableOpacity>

      <Text style={styles.title}>Motos Encontradas: {motos.length}</Text>

      <FlatList
        data={motos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>Modelo: {item.modelo}</Text>
            <Text style={styles.label}>Placa: {item.placa}</Text>
            <Text style={styles.label}>Pátio: {item.patio}</Text>
            {/* Adicione outros campos que você tenha */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 20,
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 10,
    padding: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 90,
    marginLeft: 5
  },
  card: {
    backgroundColor: "#1c1c1c",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(1, 139, 19, 0.74)",
    marginBottom: 12,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
});
