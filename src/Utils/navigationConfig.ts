import { RouteProp } from '@react-navigation/native';
export const Screens = {
  Home: 'Home',
  PracticeShadowing: 'PracticeShadowing',
  Welcome: 'Welcome',
  Login: 'Login',
};

export type RootStackParamList = {};

export enum IKeyScreen {
  Dashboard,
  Classes,
  Home,
}
export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;
