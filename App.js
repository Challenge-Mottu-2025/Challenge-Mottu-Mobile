import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

// Telas do app
import HomeScreen from './screens/HomeScreen';
import RegisterBikeScreen from './screens/RegisterScreen';
import LoginBikeScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import DetailsScreen from './screens/DetailsScreen';
import AdminScreen from './screens/AdminScreen';
import OpcoesScreen from './screens/OpcoesScreen';
import MotoScreen from './screens/MotoScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';

// Tema
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { ThemeSwitcherFab } from './components/ThemeToggleButton';

const Stack = createNativeStackNavigator();

function NavigationRoot() {
  const { theme, isDark } = useTheme();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.colors.background,
      card: theme.colors.headerBackground,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary
    }
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.headerBackground}
      />
      <Stack.Navigator
        initialRouteName="LoginUser"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.headerBackground },
          headerTintColor: theme.colors.headerText,
          headerTitleStyle: { fontWeight: '600' }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterBike"
          component={RegisterBikeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginBike"
          component={LoginBikeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Opcoes"
          component={OpcoesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Motos"
          component={MotoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: 'Área Admin'
          }}
        />
        <Stack.Screen
          name="LoginUser"
          component={UserLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterUser"
          component={UserRegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <ThemeSwitcherFab />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationRoot />
    </ThemeProvider>
  );
}