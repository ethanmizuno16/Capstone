import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeInterface from './HomeInterface';
import DetailedOR from './DetailedOR';
import ProfileScreen from './ProfileScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeInterface} options={{ title: 'OR List' }} />
        <Stack.Screen name="DetailedOR" component={DetailedOR} options={{ title: 'OR Details' }} />
      </Stack.Navigator>
  );
}

const MenuInterface = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Drawer.Navigator>
  );
};

export default MenuInterface;