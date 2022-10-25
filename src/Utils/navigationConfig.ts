import { RouteProp } from '@react-navigation/native';
export const Screens = {
  Home: 'Home',
  ListLession: 'ListLession',
  PracticeShadowing: 'PracticeShadowing',
  Welcome: 'Welcome',
  Login: 'Login',
  Settings: 'Settings',
  Dictionary: 'Dictionary',
  Pharagraph: 'Pharagraph',
  CheckVoice: 'CheckVoice',
  Translations: 'Translations',
  FAQ: 'FAQ',
  TermAndPolicy: 'TermAndPolicy',
  AboutApp: 'AboutApp',
  InfoUser: 'InfoUser',
  EditProfile: 'EditProfile',
};

export type RootStackParamList = {
  CheckVoice: {
    data: {
      result: string;
      content: string;
    };
  };
  Translations: {
    data: string;
  };
  PracticeShadowing: {
    key: string;
  };
  Pharagraph: {
    key: string;
  };
};

export enum IKeyScreen {
  Dashboard,
  Classes,
  Home,
}
export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;
