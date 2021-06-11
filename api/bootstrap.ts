import { VercelRequest, VercelResponse } from '@vercel/node';
import githubHttpClient from '../src/utils/request/GithubHttpClient';

const { GITHUB_OWNER = '', GITHUB_REPO = '' } = process.env;

interface Response {
    content: string
    type: string
    encoding: 'base64'
    sha: string
}

export default async (_: VercelRequest, res: VercelResponse) => {
    try {
        const response = await githubHttpClient.get<Response>(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/bootstrap.json`);

        const data = Buffer.from(response.data.content, 'base64').toString('ascii');

        return res.json({
            success: true,
            data: JSON.parse(data),
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            data: err.message,
        });
    }
}