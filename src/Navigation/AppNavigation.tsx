import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import Login from '../Screens/AuthScreens/Login';
import HomeDetail from '../Screens/MainScreens/HomeDetail';

import HomeScreen from '../Screens/MainScreens/HomeScreen';
import Tabbar from './Tabbar';

const Stack = createNativeStackNavigator();
const App = () => {
  let isLogin: boolean = false;
  const authScreens = useMemo(() => {
    return (
      <React.Fragment>
        <Stack.Screen name="Login" component={Login} />
      </React.Fragment>
    );
  }, []);

  const mainScreens = useMemo(() => {
    return (
      <React.Fragment>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeDetail" component={HomeDetail} />
        <Stack.Screen name="Tabbar" component={Tabbar} />
      </React.Fragment>
    );
  }, []);

  const NavigationView = useMemo(() => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabbar" screenOptions={{ headerShown: false }}>
          {isLogin ? authScreens : mainScreens}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }, [authScreens, mainScreens, isLogin]);

  return <React.Fragment>{NavigationView}</React.Fragment>;
};

export default App;
