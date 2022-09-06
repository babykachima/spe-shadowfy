import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ic_facebook, ic_google, ic_logosignin } from '../../Assets';

import TextCommon from '../../Common/Components/TextCommon';

const Login = () => {
  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.header}>
        <View style={styles.contentHeader}>
          <TextCommon title="Sign In" containStyles={styles.title} />
          <TextCommon title="Let's go on start with interesting lessons!" containStyles={styles.description} />
        </View>
        <Image source={ic_logosignin} style={styles.logo} resizeMode="cover" />
      </View>
      <View style={styles.socialContent}>
        <TouchableOpacity style={[styles.button, styles.btnGoogle]}>
          <Image source={ic_google} style={styles.icon} />
          <TextCommon title="Continue with Google" containStyles={styles.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={ic_facebook} style={styles.icon} />
          <TextCommon title="Continue with Facebook" containStyles={styles.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  contentHeader: {
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: 230,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
  },
  socialContent: {
    paddingHorizontal: 50,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#ACADAD',
  },
  btnGoogle: {
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
export default Login;
