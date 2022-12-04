export interface IBanner {
  key: string;
  image: string;
}
export interface IIconCategories {
  id: number;
  title: string;
  icon: string | number;
  value: string;
}
export interface ILession {
  key: string;
  title: string;
  content: string;
  image: string;
  date: string;
  audio: string;
  create_at: string;
  category: string;
}
export interface IRouteTabar {
  name: string;
  icon: string;
}
export enum EStorage {
  TOKEN = 'TOKEN',
  GUEST_MODE = 'GUEST_MODE',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LANGUAGE = 'LANGUAGE',
}

export enum SizeIcon {
  M = 'm',
  S = 's',
  L = 'l',
}
export interface IRate {
  id: number;
  rate: string;
  value: number;
}
