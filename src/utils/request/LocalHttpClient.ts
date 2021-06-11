import HttpClient from './base/HttpClient';
import { DispatchAction } from 'core/context/types';
import { ErrorActions } from '../../modules/error/types';

class LocalHttpClient extends HttpClient {
    private static classInstance?: LocalHttpClient;
    public dispatch?: DispatchAction<any>

    private constructor() {
        super('', {}, { responseType: 'json' });

        this.responseOnRejected = this.responseOnRejected.bind(this)
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new LocalHttpClient();
        }

        return this.classInstance;
    }

    public setDispatch(dispatch: DispatchAction<any>) {
        this.dispatch = dispatch
    }

    protected responseOnRejected(err: any): any {
        if (!HttpClient.isProduction()) {
            console.log('axios.response.error', err);
        }

        if (this.dispatch) {
            this.dispatch({ type: ErrorActions.AXIOS_ERROR, payload: err })
        }

        return Promise.reject(err);
    }
}

const localHttpClient = LocalHttpClient.getInstance();

export default localHttpClient;