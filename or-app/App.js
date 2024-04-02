import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuInterface from './MenuInterface'; // Ensure this is correctly imported

export default function App() {
  return (
    <NavigationContainer>
      <MenuInterface />
    </NavigationContainer>
  );
}