import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

import HeaderWelcome from './HeaderWelcome';
import Sections from './Sections';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const navigateScreen = useCallback(
    (key: string) => {
      return navigation.navigate(Screens.PracticeShadowing as never, { key: key } as never);
    },
    [navigation]
  );

  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.header}>
        <HeaderWelcome />
      </View>
      <Sections onMoveScreen={navigateScreen} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {},
  categoryHeader: {
    marginTop: 20,
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default Home;
