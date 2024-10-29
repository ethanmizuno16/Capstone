import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import EpiduralsTab from './EpiduralsTab';
import DeliveriesTab from './DeliveriesTab';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const ObstetricsScreen = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#0066CC', // Active tab color
      tabBarInactiveTintColor: '#8e8e93', // Inactive tab color
      tabBarLabelStyle: {
        fontSize: 16, // Larger font size
        fontWeight: 'bold',
        paddingBottom: 4, // Adds some spacing between the label and the icon
      },
      tabBarStyle: {
        height: 70, // Increases the height of the bottom tab bar
        paddingBottom: 10, // Provides some extra padding at the bottom for larger text
        paddingTop: 5, // Padding at the top for spacing
      },
    }}
  >
    <Tab.Screen 
      name="Epidurals" 
      component={EpiduralsTab} 
      options={{
        tabBarLabel: 'Epidurals',
        tabBarIcon: ({ color, size }) => <Ionicons name="medkit" color={color} size={size + 5} />, // Icon with a slightly larger size
      }} 
    />
    <Tab.Screen 
      name="Deliveries" 
      component={DeliveriesTab} 
      options={{
        tabBarLabel: 'Deliveries',
        tabBarIcon: ({ color, size }) => <Ionicons name="body" color={color} size={size + 5} />, // Icon with a slightly larger size
      }} 
    />
  </Tab.Navigator>
);

export default ObstetricsScreen;
