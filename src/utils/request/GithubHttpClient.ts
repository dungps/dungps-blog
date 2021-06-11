import HttpClient from './base/HttpClient';

const { GITHUB_API_URL = "https://api.github.com", GITHUB_ACCESS_TOKEN = "" } = process.env

class GithubHttpClient extends HttpClient {
    private static classInstance?: GithubHttpClient;

    private constructor() {
        super(
            GITHUB_API_URL,
            {
                Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
                Accept: `application/vnd.github.v3+json`
            },
            { responseType: 'json' },
            false
        );
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new GithubHttpClient();
        }

        return this.classInstance;
    }
}

const githubHttpClient = GithubHttpClient.getInstance();

export default githubHttpClient;