import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListLession from '../Screens/MainScreens/ListLession';
import Home from '../Screens/MainScreens/Home';
import { ic_home, ic_menu, ic_user } from '../Assets';
import { Image, StyleSheet } from 'react-native';
import UserProfile from '../Screens/MainScreens/UserProfile';

const Tab = createBottomTabNavigator();
const Tabbar: React.FC = () => {
  const getScreenOptions = () => {
    return {
      headerShown: false,
      tabBarActiveBackgroundColor: '#FECC31',
    };
  };
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: '#000000',
          },
          tabBarLabel: 'Home',
          tabBarIcon: () => <Image source={ic_home} style={styles.icon} />,
        }}
      />
      <Tab.Screen
        name="ListLession"
        component={ListLession}
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: '#000000',
          },
          tabBarLabel: 'Lessions',
          tabBarIcon: () => <Image source={ic_menu} style={styles.icon} />,
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: '#000000',
          },
          tabBarLabel: 'Person',
          tabBarIcon: () => <Image source={ic_user} style={styles.icon} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

export default Tabbar;
