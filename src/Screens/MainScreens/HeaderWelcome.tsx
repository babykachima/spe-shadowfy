import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Avatar from '../../Common/Components/Avatar';
import TextCommon from '../../Common/Components/TextCommon';

const HeaderWelcome = () => {
  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.header}>
        <View style={styles.titleContent}>
          <TextCommon title="Hello,Ethan" containStyles={styles.headerTitle} />
          <TextCommon title="Let's Learning Together!" containStyles={styles.titleWelcome} />
        </View>
        <Avatar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContent: {
    flex: 0.8,
  },
  headerTitle: {
    marginVertical: 10,
    fontSize: 18,
    color: '#191919',
  },
  titleWelcome: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
export default HeaderWelcome;
