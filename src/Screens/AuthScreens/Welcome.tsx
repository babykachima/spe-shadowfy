import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ic_study_english } from '../../Assets';
import TextCommon from '../../Common/Components/TextCommon';

const Welcome = () => {
  const navigation = useNavigation();

  const moveToLogin = useCallback(() => {
    navigation.navigate('Login' as never);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.imgLogo}>
        <Image source={ic_study_english} style={styles.logo} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <View>
          <TextCommon title="Welcome!" containStyles={styles.welcome} />
          <TextCommon
            title="We are hope you have nice experiense when to study lessions here."
            containStyles={styles.description}
          />
        </View>
        <TouchableOpacity onPress={moveToLogin} style={styles.btn}>
          <TextCommon title={'Continue'} containStyles={styles.textBtn} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  content: {
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
  },
  btn: {
    backgroundColor: '#FECC31',
    padding: 10,
    borderRadius: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {},
  textBtn: {},
});
export default Welcome;
