import React, { useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getIdUserToken } from '../Redux/selector';
import Login from '../Screens/AuthScreens/Login';
import Welcome from '../Screens/AuthScreens/Welcome';
import Home from '../Screens/MainScreens/Home';
import ListLession from '../Screens/MainScreens/ListLession';
import { EStorage } from '../Types';

import Tabbar from './Tabbar';

const Stack = createNativeStackNavigator();

const App = () => {
  const accessToken = useSelector(getIdUserToken);

  useEffect(() => {
    async () => {
      try {
        if (accessToken) {
          await AsyncStorage.setItem(EStorage.TOKEN, accessToken);
        }
      } catch (error) {
        console.log('Sign Storage ERROR:', error);
      }
    };
  }, [accessToken]);

  const isLogin = useMemo(() => {
    return !accessToken;
  }, [accessToken]);

  const authScreens = useMemo(() => {
    return (
      <React.Fragment>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
      </React.Fragment>
    );
  }, []);

  const mainScreens = useMemo(() => {
    return (
      <React.Fragment>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListLession" component={ListLession} />
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
