import {makeObservable, observable, action, computed} from 'mobx';
import {
  addBeforeRequestAction,
  addAfterRequestAction,
} from 'repositories/HttpClient';

class LoadingStore {
  loading = 0;

  constructor() {
    this.loading = 0;

    makeObservable(this, {
      loading: observable,
      isLoading: computed,
      incrementLoading: action,
      decrementLoading: action,
    });

    addBeforeRequestAction((config: any) => {
      const skipLoading = !!config?.options?.skipLoading;

      if (!skipLoading) this.incrementLoading();
    });
    addAfterRequestAction((response: any) => {
      const skipLoading = !!response?.config?.options?.skipLoading;

      if (!skipLoading) this.decrementLoading();
    });
  }

  get isLoading() {
    return !!this.loading;
  }

  incrementLoading() {
    this.loading += 1;
  }

  decrementLoading() {
    this.loading -= 1;
  }
}

export default LoadingStore;
