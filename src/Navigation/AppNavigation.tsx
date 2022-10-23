import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { getIdUserToken } from '../Redux/selector';

import Login from '../Screens/AuthScreens/Login';
import Welcome from '../Screens/AuthScreens/Welcome';
import Home from '../Screens/MainScreens/Home';
import ListLession from '../Screens/MainScreens/ListLession';

import { useAppSelector } from '../Redux/hooks';
import AboutApp from '../Screens/MainScreens/AboutApp';
import CheckVoice from '../Screens/MainScreens/CheckVoice';
import FAQ from '../Screens/MainScreens/FAQ';
import InfoUser from '../Screens/MainScreens/InfoUser';
import Pharagraph from '../Screens/MainScreens/Pharagraph';
import PracticeShadowing from '../Screens/MainScreens/PracticeShadowing';
import Sentence from '../Screens/MainScreens/Sentence';
import TermAndPolicy from '../Screens/MainScreens/TermAndPolicy';
import Translations from '../Screens/MainScreens/Translation';
import Tabbar from './Tabbar';
import EditProfile from '../Screens/MainScreens/EditProfile';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
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
        <Stack.Screen name="AboutApp" component={AboutApp} />
        <Stack.Screen name="InfoUser" component={InfoUser} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
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
