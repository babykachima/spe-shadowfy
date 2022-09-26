import { IRate } from '../Types/interface';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Config google signin
export const configGoogleSignIn = () => {
  return GoogleSignin.configure({
    webClientId: '697902738879-udam816ef8etjucvig45hjvccsudhqqt.apps.googleusercontent.com',
  });
};

export const listRates: Array<IRate> = [
  {
    id: 1,
    rate: '0.5x',
    value: 0.5,
  },
  {
    id: 2,
    rate: '0.75x',
    value: 0.75,
  },
  {
    id: 3,
    rate: '1x',
    value: 1,
  },
  {
    id: 4,
    rate: '1.5x',
    value: 1.5,
  },
];
