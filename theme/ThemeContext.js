import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, tokens } from '../constants/theme';

const STORAGE_KEY = '@themePreference';

const ThemeContext = createContext({
  theme: lightTheme,
  isDark: false,
  name: 'light',
  toggleTheme: () => {},
  setTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const system = useColorScheme(); // 'light' | 'dark'
  const [fixedPreference, setFixedPreference] = useState(null); // null => segue sistema

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setFixedPreference(saved);
      } catch (e) {
        console.warn('Falha ao carregar preferência de tema', e);
      }
    })();
  }, []);

  const effective = fixedPreference || system || 'light';
  const baseTheme = effective === 'dark' ? darkTheme : lightTheme;
  const theme = useMemo(() => ({ ...baseTheme, tokens }), [baseTheme]);

  const toggleTheme = async () => {
    const next = effective === 'dark' ? 'light' : 'dark';
    setFixedPreference(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const setTheme = async (nameOrNull) => {
    setFixedPreference(nameOrNull);
    try {
      if (nameOrNull) {
        await AsyncStorage.setItem(STORAGE_KEY, nameOrNull);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  };

  // (Opcional) escutar mudança do sistema quando usuário não fixou
  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (!fixedPreference) {
        // só reflete por recriação via useColorScheme
      }
    });
    return () => sub.remove();
  }, [fixedPreference]);

  const value = useMemo(
    () => ({
      theme,
      isDark: effective === 'dark',
      name: effective,
      toggleTheme,
      setTheme
    }),
    [theme, effective]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);