import httpClient from './HttpClient';

abstract class BaseRepository<T> {
  abstract readonly baseUrl: string;

  public async index(params: {} = {}): Promise<T[]> {
    const {data} = await httpClient.get(this.baseUrl, {params});

    return data.data;
  }

  public async create(payload: T): Promise<T> {
    const {data} = await httpClient.post(this.baseUrl, {data: payload});

    return data;
  }
}

export default BaseRepository;
