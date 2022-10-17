import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { getIdUserToken } from '../Redux/selector';
import '../Translations';

import Login from '../Screens/AuthScreens/Login';
import Welcome from '../Screens/AuthScreens/Welcome';
import Home from '../Screens/MainScreens/Home';
import ListLession from '../Screens/MainScreens/ListLession';

import { useAppSelector } from '../Redux/hooks';
import PracticeShadowing from '../Screens/MainScreens/PracticeShadowing';
import Tabbar from './Tabbar';
import Sentence from '../Screens/MainScreens/Sentence';
import Pharagraph from '../Screens/MainScreens/Pharagraph';
import CheckVoice from '../Screens/MainScreens/CheckVoice';
import Translations from '../Screens/MainScreens/Translation';
import FAQ from '../Screens/MainScreens/FAQ';
import TermAndPolicy from '../Screens/MainScreens/TermAndPolicy';

const Stack = createNativeStackNavigator();

const App = () => {
  const accessToken = useAppSelector(getIdUserToken);

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
        <Stack.Screen name="PracticeShadowing" component={PracticeShadowing} />
        <Stack.Screen name="Sentence" component={Sentence} />
        <Stack.Screen name="Pharagraph" component={Pharagraph} />
        <Stack.Screen name="CheckVoice" component={CheckVoice} />
        <Stack.Screen name="Translations" component={Translations} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="TermAndPolicy" component={TermAndPolicy} />
      </React.Fragment>
    );
  }, []);

  const NavigationView = useMemo(() => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabbar" screenOptions={{ headerShown: false }}>
          {accessToken ? mainScreens : authScreens}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }, [accessToken, authScreens, mainScreens]);

  return <React.Fragment>{NavigationView}</React.Fragment>;
};

export default App;
