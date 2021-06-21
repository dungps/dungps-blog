import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

const defaultHeader = {
    'Content-Type': 'application/json',
};

enum LogType {
    REQUEST,
    RESPONSE,
    ERROR
}

abstract class BaseRequest {
    private readonly enableLog: boolean = true;
    private readonly instance: AxiosInstance;

    public constructor(baseURL: string, enableLog: boolean = true, headers?: any, opts?: AxiosRequestConfig) {
        this.instance = axios.create({
            baseURL,
            headers: {
                ...defaultHeader,
                ...headers,
            },
            ...opts,
        });

        this.enableLog = enableLog;


        this.handleRequestOnError = this.handleRequestOnError.bind(this);
        this.handleRequestOnFulFilled = this.handleRequestOnFulFilled.bind(this);
        this.handleResponseOnError = this.handleResponseOnError.bind(this);
        this.handleResponseOnFulFilled = this.handleResponseOnFulFilled.bind(this);
        this.log = this.log.bind(this);
        this.requestLog = this.requestLog.bind(this);

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor() {
        this.instance.interceptors.request.use(
            this.handleRequestOnFulFilled,
            this.handleRequestOnError,
        );

        this.instance.interceptors.response.use(
            this.handleResponseOnFulFilled,
            this.handleResponseOnError,
        );
    }

    public handleRequestOnFulFilled(req: AxiosRequestConfig) {
        this.requestLog(req.method || 'GET', req.url || '', req, LogType.REQUEST, req.baseURL || '');

        return req;
    }

    public handleRequestOnError(error: any) {
        this.log('request.error', error?.response?.data);
        return Promise.reject(error);
    }

    public handleResponseOnFulFilled(res: AxiosResponse) {
        this.requestLog(res.config.method || 'GET', res.config.url || '', res, LogType.RESPONSE, res.config.baseURL || '');
        return res;
    }

    public handleResponseOnError(error: any) {
        this.log('response.error', { error });
        return Promise.reject(error);
    }

    public get = <T>(url: string, params = {}, config: AxiosRequestConfig = {}): AxiosPromise<T> => {
        return this.instance.get<T>(url, { params, ...config });
    };

    public post = <T>(url: string, data = {}, config: AxiosRequestConfig = {}): AxiosPromise<T> => {
        return this.instance.post<T>(url, data, config);
    };

    public put = <T>(url: string, data = {}, config: AxiosRequestConfig = {}): AxiosPromise<T> => {
        return this.instance.put<T>(url, data, config);
    };

    public patch = <T>(url: string, data = {}, config: AxiosRequestConfig = {}): AxiosPromise<T> => {
        return this.instance.patch<T>(url, data, config);
    };

    public delete = <T>(url: string, config: AxiosRequestConfig = {}): AxiosPromise<T> => {
        return this.instance.delete<T>(url, config);
    };

    protected log(...params: any) {
        if (process.env.NODE_ENV === 'development' && this.enableLog) {
            console.log(...params);
        }
    }

    protected requestLog(method: Method, url: string, data: any, type: LogType, baseURL: string) {
        const tag = type === LogType.REQUEST || type === LogType.RESPONSE ? method : 'error';
        const colors = {
            [LogType.REQUEST]: 'blue',
            [LogType.RESPONSE]: 'green',
            [LogType.ERROR]: 'red',
        };
        const icons = {
            [LogType.REQUEST]: '>>>',
            [LogType.RESPONSE]: '<<<',
            [LogType.ERROR]: 'xxx',
        };

        this.log(
            `%c${icons[type]} [${tag.toUpperCase()}] | %c${url.replace(baseURL, '')} \n`,
            `color: ${colors[type]}; font-weight: bold`,
            `color: violet; font-weight: bold`,
            data,
        );
    }
}

export default BaseRequest;
