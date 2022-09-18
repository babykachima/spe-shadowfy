import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import { ic_facebook, ic_google, ic_logosignin } from '../../Assets';

import TextCommon from '../../Common/Components/TextCommon';
import { setAccessToken } from '../../Redux/Slices/appSlice';
import { configGoogleSignIn } from '../../Utils';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const handleLoginGoogle = async () => {
    try {
      configGoogleSignIn();
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      if (idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userApp = await auth().signInWithCredential(googleCredential);
        const idTokenUser = await userApp?.user.getIdToken();
        dispatch(setAccessToken(idTokenUser));
        Snackbar.show({
          text: 'Đăng nhập thành công!',
          duration: Snackbar.LENGTH_LONG,
        });
        return userApp;
      }
      return;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('GoogleSignin Error SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('GoogleSignin Error IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('GoogleSignin Error PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log('GoogleSignin Error', error);
        // some other error happened
      }
    }
  };
  const handleLoginFacebook = () => {};
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
        <TouchableOpacity style={[styles.button, styles.btnGoogle]} onPress={handleLoginGoogle}>
          <Image source={ic_google} style={styles.icon} />
          <TextCommon title="Continue with Google" containStyles={styles.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLoginFacebook}>
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
