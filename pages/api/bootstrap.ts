import type { NextApiRequest, NextApiResponse } from 'next';

const {
    GITHUB_OWNER = '',
    GITHUB_REPO = '',
    GITHUB_API_URL = 'https://api.github.com',
    GITHUB_ACCESS_TOKEN = '',
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
        const response = await fetch(`${GITHUB_API_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/bootstrap.json`, {
            headers: {
                Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
                Accept: `application/vnd.github.v3+json`,
            },
        });

        const data: GithubResponse = await response.json();

        const convertData = Buffer.from(data.content, 'base64').toString('ascii');

        return res.status(200).json({
            success: true,
            data: JSON.parse(convertData)
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            data: e.message,
            debugger: e,
        });
    }
}