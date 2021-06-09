import HttpClient from './base/HttpClient';

class LocalHttpClient extends HttpClient {
    private static classInstance?: LocalHttpClient;

    private constructor() {
        super('', {}, { responseType: 'json' });
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new LocalHttpClient();
        }

        return this.classInstance;
    }
}

const localHttpClient = LocalHttpClient.getInstance();

export default localHttpClient;