import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 800,
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

  return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/logo-mottu.png')}
          style={[styles.logo, animatedLogoStyle]}
        />

        <Animated.View style={animatedContentStyle}>
          <Text style={styles.title}>
            Bem-vindo ao <Text style={styles.highlight}>Organizador Mottu</Text>
          </Text>
          <Text style={styles.subtitle}>
            Rastreio inteligente de motos com soluções inovadoras
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
              <Text style={styles.buttonText}>Checar Motos</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
              <Text style={styles.buttonText}>Adicionar Moto</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Admin')} style={styles.button}>
              <Text style={styles.buttonText}>Administrar Motos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.copyright}>
            <Text style={styles.textCopy}>Esta startup conta com o apoio institucional da Mottu.</Text>
            <Text style={styles.textCopy}>© 2025 Todos os direitos reservados.</Text>
          </View>
        </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flexGrow: 1,
    backgroundColor: '#0f0f0f',
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
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  highlight: {
    color: '#00FF88',
  },
  subtitle: {
    fontSize: 17,
    color: '#CCCCCC',
    marginBottom: 40,
    textAlign: 'center',
    maxWidth: 280,
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20
  },
  button: {
    paddingVertical: 12,
    marginVertical: 15,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 255, 0, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(1, 139, 19, 0.74)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
  },
  copyright: {
    marginTop: 30,
    alignItems: 'center',
  },
  textCopy: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 5,
    color: '#CCCCCC'
  }
});
