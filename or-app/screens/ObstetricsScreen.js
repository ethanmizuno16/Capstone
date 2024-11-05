import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EpiduralsTab from "./EpiduralsTab";
import DeliveriesTab from "./DeliveriesTab";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, Spacing } from "../Theme"; // Import theme variables

const Tab = createBottomTabNavigator();

// Tab bar options moved to a constant for readability and reusability
const tabBarOptions = {
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.textLight,
  tabBarLabelStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    paddingBottom: Spacing.small,
  },
  tabBarStyle: {
    height: 70,
    paddingBottom: Spacing.small,
    paddingTop: Spacing.xs,
    backgroundColor: Colors.background,
  },
};

const ObstetricsScreen = () => (
  <SafeAreaView style={styles.container}>
    <Tab.Navigator screenOptions={tabBarOptions}>
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
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Background color from theme
  },
});

export default ObstetricsScreen;
