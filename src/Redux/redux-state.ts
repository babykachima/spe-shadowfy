export interface IStore {
  app: IUserState;
}

export interface IUserState {
  accessToken: string | null;
  isLoading: boolean;
}
