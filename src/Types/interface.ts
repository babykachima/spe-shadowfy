export interface IBanner {
  id: number;
  image: string;
}
export interface IIconCategories {
  id: number;
  title: string;
  icon: string;
}
export interface ILession {
  id: number;
  title: string;
  description: string;
  image: string;
  audio: string;
}
export interface IRouteTabar {
  name: string;
  icon: string;
}
export enum EStorage {
  TOKEN = 'Token',
  GUEST_MODE = 'GUEST_MODE',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
