import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Config google signin
export const configGoogleSignIn = () => {
  return GoogleSignin.configure({
    webClientId: '697902738879-udam816ef8etjucvig45hjvccsudhqqt.apps.googleusercontent.com',
  });
};

export const regexCharacters = /[.,\n]/g;

export const uriDictinary = 'https://dictionary.cambridge.org/';
