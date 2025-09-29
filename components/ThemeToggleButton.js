import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const ThemeSwitcherFab = () => {
  const { isDark, toggleTheme, theme } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        isDark ? theme.tokens.shadow.dark : theme.tokens.shadow.light,
        { transform: [{ scale }] }
      ]}
    >
      <Pressable
        onPress={toggleTheme}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        android_ripple={{ color: theme.colors.overlay, borderless: true, radius: 32 }}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.colors.fabBackground,
            opacity: pressed && Platform.OS === 'ios' ? 0.85 : 1
          }
        ]}
      >
        <Text style={[styles.icon, { color: theme.colors.fabIcon }]}>
          {isDark ? '☀️' : '🌙'}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    borderRadius: 40
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 24
  }
});