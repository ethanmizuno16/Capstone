import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuInterface from './MenuInterface'; // Assuming MenuInterface is in the root of your project directory


export default function App() {
  return (
    <NavigationContainer>
      <MenuInterface />
    </NavigationContainer>
  );
}