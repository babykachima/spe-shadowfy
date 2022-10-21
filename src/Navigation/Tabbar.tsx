import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ic_home, ic_lessions, ic_setting } from '../Assets';
import IconCustom from '../Common/Components/IconCustom';
import TextCommon from '../Common/Components/TextCommon';
import Home from '../Screens/MainScreens/Home';
import ListLession from '../Screens/MainScreens/ListLession';
import Settings from '../Screens/MainScreens/Settings';
import { Colors } from '../Utils/colors';

const Tab = createBottomTabNavigator();

interface ICustomBarIcon {
  iconUrl: number;
  title: string;
  focused: boolean;
}

const CustomBarIcon: React.FC<ICustomBarIcon> = ({ iconUrl, title, focused }) => {
  const selectedTitle = useMemo(() => {
    return focused ? styles.selectedTitle : styles.noSelectTitle;
  }, [focused]);
  const selectedIcon = useMemo(() => {
    return focused ? Colors.primaryColor : Colors.grayColor;
  }, [focused]);
  return (
    <View style={styles.icon}>
      <IconCustom iconUrl={iconUrl} size="l" tintColor={selectedIcon} />
      <TextCommon title={title} containStyles={selectedTitle} />
    </View>
  );
};

const Tabbar: React.FC = () => {
  const { t } = useTranslation();
  const getScreenOptions = () => {
    return {
      headerShown: false,
      tabBarShowLabel: false,
    };
  };

  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <CustomBarIcon iconUrl={ic_home} focused={focused} title={t('app.home')} />,
        }}
      />
      <Tab.Screen
        name="ListLession"
        component={ListLession}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomBarIcon iconUrl={ic_lessions} focused={focused} title={t('app.lessions')} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomBarIcon iconUrl={ic_setting} focused={focused} title={t('app.settings')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  selectedTitle: {
    fontWeight: '600',
    color: Colors.primaryColor,
    marginTop: 5,
  },
  noSelectTitle: {
    color: Colors.grayColor,
    marginTop: 5,
  },
});

export default Tabbar;
