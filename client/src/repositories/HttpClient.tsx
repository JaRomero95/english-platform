import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/';

const instance = axios.create({baseURL});

instance.interceptors.request.use((config: any) => {
  // FIXME: extract a module with localStorage access to avoid repeat this code present in UserStoreContext
  const token = localStorage.getItem('user-token');

  if (!token) return config;

  config.headers!['Authorization'] = `Bearer ${token}`;

  return config;
});

export function addBeforeRequestAction(callback: (arg: any) => void) {
  instance.interceptors.request.use(
    (config) => {
      callback(config);

      return config;
    },
    (error) => {
      callback(error);

      return Promise.reject(error);
    }
  );
}

export function addAfterRequestAction(callback: (arg: any) => void) {
  instance.interceptors.response.use(
    (response) => {
      callback(response);

      return response;
    },
    (error) => {
      callback(error);

      return Promise.reject(error);
    }
  );
}

export default instance;
