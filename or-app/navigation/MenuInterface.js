import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// Import all screens
import ORDashboard from "../screens/ORDashboard";  // Updated import
import HomeScreen from "../screens/HomeScreen";
import DetailedOR from "../screens/DetailedOR";
import PACUScreen from "../screens/PACUScreen";
import RegionalScreen from "../screens/RegionalScreen";
import AcutePainScreen from "../screens/AcutePainScreen";
import ObstetricsScreen from "../screens/ObstetricsScreen";
import ProfileScreen from "../components/ProfileScreen";
import PushNotificationsScreen from "../components/PushNotificationsScreen"; // Import PushNotificationsScreen
import { SafeAreaView } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
        options={{ title: "OR Dashboard" }}  // Updated title for clarity
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
        name="PushNotifications" // Add PushNotificationsScreen to the stack
        component={PushNotificationsScreen}
        options={{ title: "Messaging" }}
      />
    </Stack.Navigator>
  );
}

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