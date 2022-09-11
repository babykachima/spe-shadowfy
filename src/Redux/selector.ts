import { IStore } from './redux-state';

export const getIdUserToken = (store: IStore) => store.app.accessToken;
