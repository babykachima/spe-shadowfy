import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Screens } from '../../Utils/navigationConfig';

import HeaderWelcome from './HeaderWelcome';
import Sections from './Sections';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const navigateScreen = useCallback(() => {
    navigation.navigate(Screens.PracticeShadowing as never);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.header}>
        <HeaderWelcome />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Sections onMoveScreen={navigateScreen} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
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
