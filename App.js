import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
