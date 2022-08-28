import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/MainScreens/HomeScreen';
import HomeDetail from '../Screens/MainScreens/HomeDetail';

const Tab = createBottomTabNavigator();
const Tabbar: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="HomeDetail" component={HomeDetail} />
    </Tab.Navigator>
  );
};

export default Tabbar;
