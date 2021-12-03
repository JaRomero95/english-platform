import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

instance.interceptors.request.use((config) => {
  // FIXME: extract a module with localStorage access to avoid repeat this code present in UserStoreContext
  const token = localStorage.getItem('user-token');

  if (!token) return config;

  config.headers!['Authorization'] = `Bearer ${token}`;

  return config;
});

export default instance;
