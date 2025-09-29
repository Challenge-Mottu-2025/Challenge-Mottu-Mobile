import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme, isDark } = useTheme();

  const logoAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedLogoStyle = {
    opacity: logoAnim,
    transform: [
      {
        scale: logoAnim.interpolate({
          inputRange: [0, 1],
            outputRange: [0.8, 1],
        }),
      },
    ],
  };

  const animatedContentStyle = {
    alignItems: 'center',
    width: '100%',
    opacity: contentAnim,
    transform: [
      {
        translateY: contentAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [40, 0],
        }),
      },
    ],
  };

  const themedStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: theme.colors.background,
      },
      title: {
        color: theme.colors.text,
      },
      highlight: {
        color: theme.colors.primary,
      },
      subtitle: {
        color: theme.colors.textSecondary,
      },
      buttonBase: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.border,
      },
      buttonText: {
        color: theme.colors.primaryContrast,
      },
      copyText: {
        color: theme.colors.textSecondary,
      },
    };
  }, [theme]);

  const buttons = [
    { label: 'Checar Motos', route: 'Opcoes' },
    { label: 'Adicionar Moto', route: 'Register' },
    { label: 'Administrar Motos', route: 'Admin' }
  ];

  return (
    <View style={[styles.container, themedStyles.container]}>
      <Animated.Image
        source={require('../assets/logo-mottu.png')}
        style={[styles.logo, animatedLogoStyle]}
      />

      <Animated.View style={animatedContentStyle}>
        <Text style={[styles.title, themedStyles.title]}>
          Bem-vindo ao <Text style={[styles.highlight, themedStyles.highlight]}>Organizador Mottu</Text>
        </Text>

        <Text style={[styles.subtitle, themedStyles.subtitle]}>
          Rastreio inteligente de motos com soluções inovadoras
        </Text>

        <View style={styles.buttonsContainer}>
          {buttons.map(btn => (
            <Pressable
              key={btn.route}
              onPress={() => navigation.navigate(btn.route)}
              style={({ pressed }) => [
                styles.button,
                themedStyles.buttonBase,
                pressed && { opacity: 0.85 }
              ]}
              android_ripple={{ color: theme.colors.overlay }}
            >
              <Text style={[styles.buttonText, themedStyles.buttonText]}>
                {btn.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.footerInfo}>
          <View
            style={[
              styles.infoBox,
            ]}
          >
            <Text style={[styles.infoText, themedStyles.copyText]}>
              Esta startup conta com o apoio institucional da Mottu.
            </Text>
            <Text style={[styles.infoText, themedStyles.copyText]}>
              © 2025 Todos os direitos reservados.
            </Text>
            <Text
              style={[
                styles.infoTextMini,
                { color: themedStyles.subtitle.color, marginTop: 8, fontSize: 11 }
              ]}
            >
              Tema atual: {theme.name === 'dark' ? 'Escuro' : 'Claro'}
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '800'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 34,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 24
  },
  button: {
    paddingVertical: 14,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  footerInfo: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  infoBox: {
    width: '100%',
    padding: 16,
    borderRadius: 14
  },
  infoText: {
    fontSize: 12.5,
    textAlign: 'center',
    marginVertical: 4,
  },
  infoTextMini: {
    textAlign: 'center'
  }
});