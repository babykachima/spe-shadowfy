export interface IBanner {
  id: number;
  image: string;
}
export interface IIconCategories {
  id: number;
  title: string;
  icon: string | number;
}
export interface ILession {
  id: number | string;
  title: string;
  content: string;
  image: string;
  date: string;
  audio: string;
  create_at: string;
}
export interface IRouteTabar {
  name: string;
  icon: string;
}
export enum EStorage {
  TOKEN = 'TOKEN',
  GUEST_MODE = 'GUEST_MODE',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
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
