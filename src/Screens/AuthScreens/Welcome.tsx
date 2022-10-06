import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ic_arrow_right, ic_view_01 } from '../../Assets';
import IconCustom from '../../Common/Components/IconCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

const Welcome = () => {
  const navigation = useNavigation();

  const onNavigateContinue = useCallback(() => {
    navigation.navigate(Screens.Login as never);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.imgLogo}>
        <Image source={ic_view_01} style={styles.logo} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <TextCommon title="Speaking fluently has never been so easy!" containStyles={styles.titleWelcome} />
        <View style={styles.containContinue}>
          <TouchableOpacity onPress={onNavigateContinue}>
            <IconCustom iconUrl={ic_arrow_right} />
          </TouchableOpacity>
          <TextCommon title="Practice now !" containStyles={styles.titlePractice} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imgLogo: {
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 20,
  },
  logo: {
    maxWidth: 400,
    maxHeight: 400,
    borderRadius: 20,
  },
  content: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  titleWelcome: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  containContinue: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlePractice: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: Colors.primaryColor,
  },
});
export default Welcome;
