import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuInterface from './MenuInterface'; // Assuming MenuInterface is in the root of your project directory
import { SurgeryProvider } from './SurgeryContext'; // Import the provider
import {configureNotifications } from './notifications';

export default function App() {
    configureNotifications();

  return (
    <SurgeryProvider>
      <NavigationContainer>
        <MenuInterface />
      </NavigationContainer>
    </SurgeryProvider>
  );
}