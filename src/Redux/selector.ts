import { EStorage } from '../Types';
import { storage } from '../Utils/storage';
import { IStore } from './redux-state';

export const getIdUserToken = (store: IStore) =>
  storage.getBoolean(EStorage.TOKEN) ? storage.getString(EStorage.TOKEN) : store.app.accessToken;
export const checkLoading = (store: IStore) => store.app.isLoading;
export const getLanguage = (store: IStore) =>
  storage.getBoolean(EStorage.LANGUAGE) ? storage.getString(EStorage.LANGUAGE) : store.app.language;
