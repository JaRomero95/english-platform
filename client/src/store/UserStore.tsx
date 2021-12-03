import {makeObservable, observable, action, autorun} from 'mobx';

const USER_TOKEN_STORAGE_KEY = 'user-token';

class UserStore {
  token: string | null = null;

  constructor() {
    this.token = localStorage.getItem(USER_TOKEN_STORAGE_KEY);

    makeObservable(this, {
      token: observable,
      setToken: action,
    });

    autorun(() => {
      const {token} = this;

      if (token) {
        localStorage.setItem(USER_TOKEN_STORAGE_KEY, token);
      } else {
        localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
      }
    });
  }

  setToken(token: string | null) {
    this.token = token;
  }
}

export default UserStore;
