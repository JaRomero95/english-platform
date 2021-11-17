import httpClient from './HttpClient';

abstract class BaseRepository<T> {
  abstract readonly baseUrl: string;

  public async index(): Promise<T[]> {
    const {data} = await httpClient.get(this.baseUrl);

    return data;
  }
}

export default BaseRepository;
