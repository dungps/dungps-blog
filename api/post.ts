import { VercelRequest, VercelResponse } from '@vercel/node';
import githubHttpClient from '../src/utils/request/GithubHttpClient';
import { Post } from '../src/models/Post';

const { GITHUB_OWNER = '', GITHUB_REPO = '' } = process.env;

interface Response {
    content: string
    type: string
    encoding: 'base64'
    sha: string
}

export default async (req: VercelRequest, res: VercelResponse) => {
    const { slug, category, tag, limit = "10", page = "1", s } = req.query;

    try {
        const response = await githubHttpClient.get<Response>(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/posts.json`);

        const data = Buffer.from(response.data.content, 'base64').toString('ascii');
        let dataParsed: Array<Post> = JSON.parse(data);

        if (category && category.length) {
            dataParsed = dataParsed.filter((o: Post) => o.category === category)
        }

        if (tag && tag.length) {
            dataParsed = dataParsed.filter((o: Post) => o.tags.includes(tag as string))
        }

        if (slug) {
            const index = dataParsed.findIndex((o: Post) => o.slug === slug);

            if (index > -1 && dataParsed[index] && dataParsed[index].link) {
                const postRes = await githubHttpClient.get<Response>(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dataParsed[index].link}`);
                dataParsed[index].content = Buffer.from(postRes.data.content, 'base64').toString('ascii');
                return res.json({
                    success: true,
                    data: dataParsed[index],
                });
            }

            return res.status(404).json({
                success: false,
                data: 'Post not found',
            });
        }

        if (s) {
            dataParsed = dataParsed.filter((o: Post) => o.title.includes(s as string))
        }

        const dataPaging: Array<Post> = []
        let start = (parseInt(page as string) - 1) * parseInt(limit as string)
        const end = start + parseInt(limit as string)
        while (start < end && start < dataParsed.length) {
            dataPaging.push(dataParsed[start])
            start++
        }

        return res.json({
            success: true,
            data: dataPaging,
            pagination: {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                total_items: dataParsed.length,
                total_page: Math.ceil(dataParsed.length / parseInt(limit as string))
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            data: err.message,
        });
    }
}