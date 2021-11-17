import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

// class HttpClient {
//   public static async get(url): Promise {
//     const response = await httpClient.get(url);
//     return response;
//   }
// }

export default instance;
