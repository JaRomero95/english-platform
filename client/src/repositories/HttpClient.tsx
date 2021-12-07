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

export default instance;
