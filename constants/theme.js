export const lightTheme = {
  name: 'light',
  colors: {
    background: '#FFFFFF',
    backgroundAlt: '#F3F5F7',
    text: '#1E252C',
    textSecondary: '#5B6472',
    primary: '#00C851',
    primaryContrast: '#FFFFFF',
    border: '#E2E8F0',
    card: '#FFFFFF',
    headerBackground: '#0f0f0f',
    headerText: '#FFFFFF',
    fabBackground: '#00C851',
    fabIcon: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.08)'
  }
};

export const darkTheme = {
  name: 'dark',
  colors: {
    background: '#0f0f0f',
    backgroundAlt: '#0f0f0f',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    primary: '#00C851',
    primaryContrast: '#FFFFFF',
    border: '#2F3A44',
    card: '#1E262E',
    headerBackground: '#0f0f0f',
    headerText: '#FFFFFF',
    fabBackground: '#00C851',
    fabIcon: '#FFFFFF',
    overlay: 'rgba(255,255,255,0.12)'
  }
};

export const tokens = {
  spacing: (n = 1) => n * 8,
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    round: 999
  },
  shadow: {
    light: {
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 }
    },
    dark: {
      elevation: 6,
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 }
    }
  }
};