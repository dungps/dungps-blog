import BaseRequest from './BaseRequest';

const { GITHUB_API_URL = 'https://api.github.com', GITHUB_ACCESS_TOKEN = '' } = process.env;

class GithubRequest extends BaseRequest {
    private static classInstance?: GithubRequest;

    private constructor() {
        super(
            GITHUB_API_URL,
            false,
            {
                Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
                Accept: `application/vnd.github.v3+json`,
            },
            {
                responseType: 'json',
            },
        );
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new GithubRequest();
        }

        return this.classInstance;
    }
}

const githubRequest = GithubRequest.getInstance();

export default githubRequest;
