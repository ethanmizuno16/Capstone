import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EpiduralsTab from "./EpiduralsTab";
import DeliveriesTab from "./DeliveriesTab";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, Spacing } from "../Theme"; // Import theme variables

const Tab = createBottomTabNavigator();

const ObstetricsScreen = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: Colors.primary, // Use primary color from theme
      tabBarInactiveTintColor: Colors.textLight, // Use a lighter text color for inactive
      tabBarLabelStyle: {
        fontSize: Fonts.size.medium, // Use font size from theme
        fontFamily: Fonts.family.bold, // Use bold font from theme
        paddingBottom: Spacing.small, // Padding from theme
      },
      tabBarStyle: {
        height: 70, // Customize tab bar height if needed
        paddingBottom: Spacing.small,
        paddingTop: Spacing.xs, // Use spacing constants for consistent padding
        backgroundColor: Colors.background, // Background color from theme
      },
    }}
  >
    <Tab.Screen
      name="Epidurals"
      component={EpiduralsTab}
      options={{
        tabBarLabel: "Epidurals",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="medkit" color={color} size={size + 5} />
        ),
      }}
    />
    <Tab.Screen
      name="Deliveries"
      component={DeliveriesTab}
      options={{
        tabBarLabel: "Deliveries",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="body" color={color} size={size + 5} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default ObstetricsScreen;
