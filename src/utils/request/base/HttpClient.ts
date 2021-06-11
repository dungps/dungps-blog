import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosPromise,
} from 'axios';

const defaultHeaders = {
    'Content-Type': 'application/json',
};

abstract class HttpClient {
    protected readonly instance: AxiosInstance;
    protected readonly showConsole: boolean;

    public constructor(
        baseURL: string,
        headers = {},
        options?: AxiosRequestConfig,
        showConsole: boolean = true,
    ) {
        this.instance = axios.create({
            baseURL,
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            timeout: 10000,
            ...options,
        });
        this.showConsole = showConsole;
        this.initializeResponseInterceptor = this.initializeResponseInterceptor.bind(this);
        this.requestOnFulfilled = this.requestOnFulfilled.bind(this);
        this.requestOnRejected = this.requestOnRejected.bind(this);
        this.responseOnFulfilled = this.responseOnFulfilled.bind(this);
        this.responseOnRejected = this.responseOnRejected.bind(this);
        this.initializeResponseInterceptor();
    }

    public static isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }

    public get = <T>(
        url: string,
        params = {},
        config: AxiosRequestConfig = {},
    ): AxiosPromise<T> => this.instance.get<T>(url, { params, ...config });

    public post = <T>(
        url: string,
        data: any = {},
        config: AxiosRequestConfig = {},
    ) => this.instance.post<T>(url, data, config);

    public put = <T>(
        url: string,
        data: any = {},
        config: AxiosRequestConfig = {},
    ) => this.instance.put<T>(url, data, { ...config });

    public delete<T>(url: string, config: AxiosRequestConfig = {}) {
        return this.instance.delete<T>(url, { ...config });
    }

    private initializeResponseInterceptor() {
        this.instance.interceptors.request.use(
            this.requestOnFulfilled,
            this.requestOnRejected,
        );

        this.instance.interceptors.response.use(
            this.responseOnFulfilled,
            this.responseOnRejected,
        );
    };

    protected requestOnFulfilled(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
        if (!HttpClient.isProduction()) {
            if (this.showConsole) console.log('axios.request', config.method, config.url, config, config.baseURL);
        }
        return config;
    }

    protected requestOnRejected(err: any): any {
        if (!HttpClient.isProduction()) {
            if (this.showConsole) console.log('axios.request.error', err);
        }
        return Promise.reject(err);
    }

    protected responseOnFulfilled(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
        if (!HttpClient.isProduction()) {
            const { config } = response;
            if (this.showConsole) console.log('axios.response', config.method, config.url, config, config.baseURL);
        }
        return response;
    }

    protected responseOnRejected(err: any): any {
        if (!HttpClient.isProduction()) {
            if (this.showConsole) console.log('axios.response.error', err);
        }
        return Promise.reject(err);
    }
}

export default HttpClient;