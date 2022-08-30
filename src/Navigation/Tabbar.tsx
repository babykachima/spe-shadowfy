import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeDetail from '../Screens/MainScreens/HomeDetail';
import Home from '../Screens/MainScreens/Home';

const Tab = createBottomTabNavigator();
const Tabbar: React.FC = () => {
  const getScreenOptions = () => {
    return {
      headerShown: false,
      // tabBarActiveTintColor: '#0000',
    };
  };
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="HomeDetail" component={HomeDetail} />
    </Tab.Navigator>
  );
};

export default Tabbar;
