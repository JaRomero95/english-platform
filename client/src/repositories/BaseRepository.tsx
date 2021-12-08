import httpClient from './HttpClient';

interface Pagination {
  page: number;
  per_page: number;
  total_elements: number;
}

interface RequestOptions {
  skipLoading?: boolean;
}

abstract class BaseRepository<T> {
  abstract readonly baseUrl: string;

  public async index(
    params: {} = {},
    options: RequestOptions = {}
  ): Promise<{data: T[]; meta: Pagination}> {
    const {data} = await httpClient.get(this.baseUrl, {params, options} as any);

    return data;
  }

  public async update(
    id: number,
    payload?: Partial<T>,
    options: RequestOptions = {}
  ): Promise<T> {
    const {data} = await httpClient.put(
      this.resourceUrl(id),
      {
        data: payload,
      },
      {
        options,
      } as any
    );

    return data.data;
  }

  public async create(payload: T, options: RequestOptions = {}): Promise<T> {
    const {data} = await httpClient.post(
      this.baseUrl,
      {
        data: payload,
      },
      {
        options,
      } as any
    );

    return data.data;
  }

  public async delete(id: number, options: RequestOptions = {}): Promise<null> {
    await httpClient.delete(this.resourceUrl(id), {options} as any);

    return null;
  }

  private resourceUrl(id: number) {
    return `${this.baseUrl}/${id}`;
  }
}

export default BaseRepository;
