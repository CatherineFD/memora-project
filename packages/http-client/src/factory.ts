export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  /**
   * Функция для получения токена, токены в микрофронтах могут храниться в разных местах
   */
  getAuthToken?: () => string | Promise<string>; 
  defaultHeaders?: Record<string, string>;
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export interface HttpClient {
  get: <T>(url: string, config?: RequestOptions) => Promise<T>;
  post: <T>(url: string, body?: unknown, config?: RequestOptions) => Promise<T>;
  put: <T>(url: string, body?: unknown, config?: RequestOptions) => Promise<T>;
  delete: <T>(url: string, config?: RequestOptions) => Promise<T>;
}

export function createHttpClient(config: HttpClientConfig): HttpClient {
  const { baseURL, timeout = 10000, getAuthToken, defaultHeaders = {} } = config;

    async function request<T>(
        endpoint: string, 
        options: RequestOptions = {}
    ): Promise<T> {
        const url = `${baseURL}${endpoint}`;
        /**
          * Получение токена перед каждым запросом
          */
        const token = getAuthToken ? await getAuthToken() : null;

        const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
        const response = await fetch(url, {
            ...options,
            headers,
            signal: controller.signal,
            body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        });

        /**
         * Вызов глобального обратчика ошибок
         */
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        /**
        * Если ответ пустой (например, 204 No Content)
        */
        if (response.status === 204) return {} as T;

        return await response.json();
        } finally {
        clearTimeout(timeoutId);
        }
    }

    /**
    * Возвращаем чистый интерфейс
    */
    return {
        get: <T>(url: string, cfg?: RequestOptions) => request<T>(url, { ...cfg, method: 'GET' }),
        post: <T>(url: string, body?: unknown, cfg?: RequestOptions) => request<T>(url, { ...cfg, method: 'POST', body }),
        put: <T>(url: string, body?: unknown, cfg?: RequestOptions) => request<T>(url, { ...cfg, method: 'PUT', body }),
        delete: <T>(url: string, cfg?: RequestOptions) => request<T>(url, { ...cfg, method: 'DELETE' }),
    };
}