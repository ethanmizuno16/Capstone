import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native";

// Import screens
import ORDashboard from "../screens/ORDashboard";
import HomeScreen from "../screens/HomeScreen";
import DetailedOR from "../screens/DetailedOR";
import PACUScreen from "../screens/PACUScreen";
import RegionalScreen from "../screens/RegionalScreen";
import AcutePainScreen from "../screens/AcutePainScreen";
import ObstetricsScreen from "../screens/ObstetricsScreen";
import ProfileScreen from "../components/ProfileScreen";
import PushNotificationsScreen from "../components/PushNotificationsScreen";

// Create Stack and Drawer Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Define HomeStack (Stack Navigator)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="ORDashboard"
        component={ORDashboard}
        options={{ title: "OR Dashboard" }}
      />
      <Stack.Screen
        name="DetailedOR"
        component={DetailedOR}
        options={{ title: "OR Details" }}
      />
      <Stack.Screen
        name="PACUScreen"
        component={PACUScreen}
        options={{ title: "PACU" }}
      />
      <Stack.Screen
        name="RegionalScreen"
        component={RegionalScreen}
        options={{ title: "Regional" }}
      />
      <Stack.Screen
        name="AcutePainScreen"
        component={AcutePainScreen}
        options={{ title: "Acute Pain" }}
      />
      <Stack.Screen
        name="ObstetricsScreen"
        component={ObstetricsScreen}
        options={{ title: "Obstetrics" }}
      />
      <Stack.Screen
        name="PushNotifications"
        component={PushNotificationsScreen}
        options={{ title: "Messaging" }}
      />
    </Stack.Navigator>
  );
}

// Define custom content for the drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView>
        <DrawerItem
          label="Home"
          onPress={() =>
            props.navigation.reset({
              index: 0,
              routes: [{ name: "HomeStack" }],
            })
          }
        />
        <DrawerItem
          label="Profile"
          onPress={() => props.navigation.navigate("Profile")}
        />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

// Main MenuInterface with Drawer Navigator
const MenuInterface = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default MenuInterface;
