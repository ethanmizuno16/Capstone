
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeInterface from './HomeInterface';
import DetailedOR from './DetailedOR'; 
// Import other screens later for the menu

const Drawer = createDrawerNavigator();

const MenuInterface = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeInterface} />
      <Drawer.Screen name="Details" component={DetailedOR} />
      {/* Other menu options will be added here as we write them */}
    </Drawer.Navigator>
  );
};

export default MenuInterface;