import BaseRequest from './BaseRequest';

class LocalRequest extends BaseRequest {
    private static classInstance?: LocalRequest;

    private constructor() {
        super(
            process.env.NODE_ENV === 'development' ? `http://localhost:3000` : 'https://www.dungps.com',
            false,
            {},
            {
                responseType: 'json',
            },
        );
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new LocalRequest();
        }

        return this.classInstance;
    }
}

const localRequest = LocalRequest.getInstance();

export default localRequest;
