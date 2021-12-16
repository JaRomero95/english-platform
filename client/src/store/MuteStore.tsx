import {makeObservable, observable, action, autorun} from 'mobx';

const MUTE_STORAGE_KEY = 'mute';

class MuteStore {
  mute = false;

  constructor() {
    const stringMute = localStorage.getItem(MUTE_STORAGE_KEY);
    this.mute = stringMute === 'true';

    makeObservable(this, {
      mute: observable,
      setMute: action,
    });

    autorun(() => {
      const {mute} = this;

      if (mute) {
        localStorage.setItem(MUTE_STORAGE_KEY, mute.toString());
      } else {
        localStorage.removeItem(MUTE_STORAGE_KEY);
      }
    });
  }

  setMute(mute: boolean) {
    this.mute = mute;
  }
}

export default MuteStore;
