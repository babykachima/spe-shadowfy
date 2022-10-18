import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ic_google, ic_view_02 } from '../../Assets';

import TextCommon from '../../Common/Components/TextCommon';
import { useAppDispatch } from '../../Redux/hooks';
import { setAccessToken } from '../../Redux/Slices/appSlice';
import { configGoogleSignIn } from '../../Utils';
import { Colors } from '../../Utils/colors';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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

  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.header}>
        <View style={styles.titleHeader}>
          <TextCommon title={t('app.signin')} containStyles={styles.title} />
        </View>
        <View style={styles.contentImg}>
          <Image source={ic_view_02} style={styles.logo} resizeMode="cover" />
        </View>
      </View>
      <View style={styles.socialContent}>
        <TextCommon title={t('app.let_start')} containStyles={styles.description} />
        <TextCommon title={t('messages.login_with')} containStyles={styles.loginWith} />
        <TouchableOpacity style={[styles.button, styles.btnGoogle]} onPress={handleLoginGoogle}>
          <Image source={ic_google} style={styles.icon} />
          <TextCommon title={t('app.continue_with_google')} containStyles={styles.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginBottom: 40,
  },
  titleHeader: {
    margin: 20,
  },
  contentImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    maxWidth: 350,
    height: 350,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginWith: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
    color: Colors.primaryColor,
  },
  socialContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    borderColor: Colors.borderColor,
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
