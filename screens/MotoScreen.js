import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function MotoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();

  const { motos = [] } = route.params || {};

  const themed = useMemo(() => {
    return {
      container: {
        backgroundColor: theme.colors.background
      },
      title: {
        color: theme.colors.text
      },
      card: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border
      },
      label: {
        color: theme.colors.text
      },
      emptyText: {
        color: theme.colors.textSecondary
      }
    };
  }, [theme]);

  const shadowStyle = isDark ? theme.tokens.shadow.dark : theme.tokens.shadow.light;

  return (
    <View style={[styles.container, themed.container]}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <FontAwesome name="caret-left" size={28} color={theme.colors.primary} />
      </TouchableOpacity>

      <Text style={[styles.title, themed.title]}>
        Motos Encontradas: {motos.length}
      </Text>

      <FlatList
        data={motos}
        keyExtractor={(item, index) => `${item?.placa || 'moto'}-${index}`}
        contentContainerStyle={
          motos.length === 0 && { flexGrow: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text style={[styles.empty, themed.emptyText]}>
            Nenhuma moto encontrada para esta categoria.
          </Text>
        )}
        renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                themed.card,
                shadowStyle
              ]}
            >
              <Text style={[styles.label, themed.label]}>
                Modelo: <Text style={styles.value}>{item.modelo}</Text>
              </Text>
              <Text style={[styles.label, themed.label]}>
                Placa: <Text style={styles.value}>{item.placa}</Text>
              </Text>
              <Text style={[styles.label, themed.label]}>
                Pátio: <Text style={styles.value}>{item.patio}</Text>
              </Text>
            </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 90,
    paddingBottom: 20
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 6,
    padding: 10,
    zIndex: 10
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    marginLeft: 2
  },
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 14
  },
  label: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: '500'
  },
  value: {
    fontWeight: '700'
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8
  }
});