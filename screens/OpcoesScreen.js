import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Animated,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';

export default function OpcoesScreen() {
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();

  const [motos, setMotos] = useState([]);

  const containerAnim = useRef(new Animated.Value(0)).current;

  const buttons = [
    {
      label: 'Mottu Sport',
      image: require('../assets/mottu-sport.webp'),
      id: 1
    },
    {
      label: 'Mottu E',
      image: require('../assets/mottu-e.webp'),
      id: 2
    },
    {
      label: 'Mottu Pop',
      image: require('../assets/mottu-pop.webp'),
      id: 3
    }
  ];

  const buttonsAnim = buttons.map(() => ({
    opacity: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(20)).current,
    scale: useRef(new Animated.Value(1)).current
  }));

  const loadMotos = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (!keys || !keys.length) {
        setMotos([]);
        return;
      }
      const stores = await AsyncStorage.multiGet(keys);
      const motosDatas = stores
        .map(([_, value]) => {
          try {
            return JSON.parse(value);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      setMotos(motosDatas);
    } catch (error) {
      console.log('Erro ao carregar motos:', error);
    }
  };

  useEffect(() => {
    loadMotos();
    const unsubscribe = navigation.addListener('focus', loadMotos);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    Animated.timing(containerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();

    const animations = buttonsAnim.map(({ opacity, translateY }, i) =>
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          delay: i * 160,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
            duration: 500,
          delay: i * 160,
          useNativeDriver: true
        })
      ])
    );
    Animated.stagger(140, animations).start();
  }, []);

  const onPressIn = (index) => {
    Animated.spring(buttonsAnim[index].scale, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6
    }).start();
  };

  const onPressOut = (index) => {
    Animated.spring(buttonsAnim[index].scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6
    }).start();
  };

  const themed = useMemo(() => {
    return {
      container: {
        backgroundColor: theme.colors.background
      },
      title: {
        color: theme.colors.text
      },
      button: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border
      },
      buttonText: {
        color: theme.colors.text
      },
      badge: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.primaryContrast
      },
      emptyText: {
        color: theme.colors.textSecondary
      }
    };
  }, [theme]);

  return (
    <Animated.View
      style={[
        styles.container,
        themed.container,
        {
          opacity: containerAnim,
          transform: [
            {
              translateY: containerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0]
              })
            }
          ]
        }
      ]}
    >
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <AntDesign name="caretleft" size={28} color={theme.colors.primary} />
      </TouchableOpacity>

      <Text style={[styles.title, themed.title]}>Escolha sua categoria</Text>

      {buttons.map((btn, index) => {
        const motosFiltradas = motos.filter((m) => m?.modeloId === btn.id);
        return (
          <Animated.View
            key={btn.id}
            style={{
              opacity: buttonsAnim[index].opacity,
              transform: [
                { translateY: buttonsAnim[index].translateY },
                { scale: buttonsAnim[index].scale }
              ],
              marginVertical: 12,
              width: '100%',
              alignItems: 'center'
            }}
          >
            <Pressable
              onPressIn={() => onPressIn(index)}
              onPressOut={() => onPressOut(index)}
              onPress={() =>
                navigation.navigate('Motos', { motos: motosFiltradas })
              }
              style={({ pressed }) => [
                styles.button,
                themed.button,
                isDark ? theme.tokens.shadow.dark : theme.tokens.shadow.light,
                pressed && { opacity: 0.88 }
              ]}
              android_ripple={{ color: theme.colors.overlay, borderless: false }}
            >
              <Image
                source={btn.image}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={[styles.text, themed.buttonText]}>{btn.label}</Text>

              <View style={styles.metaRow}>
                {motosFiltradas.length > 0 ? (
                  <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                    <Text
                      style={[
                        styles.badgeText,
                        { color: theme.colors.primaryContrast }
                      ]}
                    >
                      {motosFiltradas.length} {motosFiltradas.length === 1 ? 'moto' : 'motos'}
                    </Text>
                  </View>
                ) : (
                  <Text style={[styles.emptyInfo, themed.emptyText]}>
                    Nenhuma cadastrada
                  </Text>
                )}
              </View>
            </Pressable>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  backArrow: {
    paddingTop: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30
  },
  button: {
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    width: 260,
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 100,
    marginBottom: 10
  },
  text: {
    fontSize: 18,
    fontWeight: '600'
  },
  metaRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600'
  },
  emptyInfo: {
    fontSize: 12
  }
});