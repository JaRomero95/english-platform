import httpClient from './HttpClient';

abstract class BaseRepository<T> {
  abstract readonly baseUrl: string;

  public async index(params: {} = {}): Promise<T[]> {
    const {data} = await httpClient.get(this.baseUrl, {params});

    return data.data;
  }

  public async update(id: number, payload?: T): Promise<T> {
    const {data} = await httpClient.put(this.resourceUrl(id), {data: payload});

    return data.data;
  }

  public async create(payload: T): Promise<T> {
    const {data} = await httpClient.post(this.baseUrl, {data: payload});

    return data.data;
  }

  public async delete(id: number): Promise<null> {
    await httpClient.delete(this.resourceUrl(id));

    return null;
  }

  private resourceUrl(id: number) {
    return `${this.baseUrl}/${id}`;
  }
}

export default BaseRepository;
