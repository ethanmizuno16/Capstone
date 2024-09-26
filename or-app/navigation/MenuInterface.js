import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// Updated paths
import HomeInterface from "../screens/HomeInterface"; 
import DetailedOR from "../screens/DetailedOR"; 
import ProfileScreen from "../components/ProfileScreen";
import PushNotificationsScreen from "../components/PushNotificationsScreen";
import { SafeAreaView } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeInterface"
        component={HomeInterface}
        options={{ title: "OR List" }}
      />
      <Stack.Screen
        name="DetailedOR"
        component={DetailedOR}
        options={{ title: "OR Details" }}
      />
      <Stack.Screen
        name="PushNotifications"
        component={PushNotificationsScreen}
        options={{ title: "Push Notifications" }}
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
      {/* Assuming you want ProfileScreen to be accessible directly from the drawer as well */}
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      {/* You can add more screens here as needed */}
    </Drawer.Navigator>
  );
};

export default MenuInterface;
