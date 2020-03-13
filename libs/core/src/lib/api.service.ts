import axios, { AxiosStatic } from 'axios';

class ApiService {
  public readonly httpClient: AxiosStatic;

  constructor() {
    this.httpClient = axios;
    this.setupDefaults();
  }

  get<T>(url: string, query?: unknown): Promise<T> {
    return this.httpClient.get(url, {
      params: query
    });
  }

  post<T>(url: string, body: unknown): Promise<T> {
    return this.httpClient.post(url, body);
  }

  patch<T>(url: string, body: unknown): Promise<T> {
    return this.httpClient.patch(url, body);
  }

  delete<T>(url: string): Promise<T> {
    return this.httpClient.delete(url);
  }

  setBaseUrl(url: string) {
    this.httpClient.defaults.baseURL = url;
  }

  setAuthHeader(token: string) {
    this.httpClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;
  }

  removeAuthHeader() {
    delete this.httpClient.defaults.headers.common['Authorization'];
  }

  private setupDefaults() {
    const contentType = 'application/json';
    this.httpClient.defaults.headers.post['Content-Type'] = contentType;
    this.httpClient.defaults.headers.patch['Content-Type'] = contentType;
  }
}

const apiService = new ApiService();

export { apiService };
