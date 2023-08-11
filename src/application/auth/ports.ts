import Profile from '~/domain/profile';

export interface AuthServiceApp {
  login: () => Promise<Profile>;
}
