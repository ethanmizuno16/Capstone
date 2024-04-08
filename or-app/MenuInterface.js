import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeInterface from './HomeInterface';
import DetailedOR from './DetailedOR';
import ProfileScreen from './ProfileScreen';
import PushNotificationsScreen from './PushNotificationsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Define a stack navigator as one of the screens in your drawer
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Operating Room List" component={HomeInterface} options={{ title: 'OR List' }} />
      <Stack.Screen name="DetailedOR" component={DetailedOR} options={{ title: 'OR Details' }} />
      <Stack.Screen name="PushNotifications" component={PushNotificationsScreen} options={{ title: 'Push Notifications' }} />
    </Stack.Navigator>
  );
}

// Include the stack navigator in your drawer navigator
const MenuInterface = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeStack">
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default MenuInterface;