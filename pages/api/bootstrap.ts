import type { NextApiRequest, NextApiResponse } from 'next';
import githubRequest from '../../src/core/utils/request/GithubRequest';

const {
    GITHUB_OWNER = '',
    GITHUB_REPO = '',
} = process.env;

interface GithubResponse {
    content: string
    type: string
    encoding: 'base64'
    sha: string
}

interface Response {
    success: boolean,
    data: any,
    debugger?: any
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    try {
        const response = await githubRequest.get<GithubResponse>(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/bootstrap.json`);

        const convertData = Buffer.from(response.data.content, 'base64').toString('ascii');

        return res.status(200).json({
            success: true,
            data: JSON.parse(convertData),
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            data: e.message,
            debugger: e,
        });
    }
}
