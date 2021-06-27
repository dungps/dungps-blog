import type { NextApiRequest, NextApiResponse } from 'next';
import { Pagination, Post } from '../../src/core/types/Post';
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
    pagination?: Pagination
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    const { slug, category, tag, limit = '10', page = '1', s } = req.query;

    try {
        const response = await githubRequest.get<GithubResponse>(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/posts.json`);

        let convertData = JSON.parse(Buffer.from(response.data.content, 'base64').toString('ascii'));

        convertData = [
            {
                'title': 'Test post',
                'slug': 'test-post',
                'category': {
                    slug: 'ahihi',
                    label: 'ahihi'
                },
                'tags': ['test', 'test-2'],
                'feature_image': 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
                'link': '_contents/test-post.md',
                content: '# Hello'
            },
            {
                'title': 'Test post',
                'slug': 'test-post-2',
                'category': {
                    slug: 'ahihi-1',
                    label: 'ahihi 1'
                },
                'tags': ['test-1', 'test-2'],
                'feature_image': 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
                'link': '_contents/test-post.md',
                'content': '# Hello'
            },
        ];

        if (category && category.length) {
            convertData = convertData.filter((o: Post) => o.category.slug === category);
        }

        if (tag && tag.length) {
            convertData = convertData.filter((o: Post) => o.tags.includes(tag as string));
        }

        if (slug) {
            const index = convertData.findIndex((o: Post) => o.slug === slug);

            if (index > -1 && convertData[index] && convertData[index].link) {
                // const postRes = await githubRequest.get<GithubResponse>(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${convertData[index].link}`);
                // convertData[index].content = Buffer.from(postRes.data.content, 'base64').toString('ascii');
                return res.status(200).json({
                    success: true,
                    data: convertData[index],
                });
            }

            return res.status(404).json({
                success: false,
                data: 'Post not found',
            });
        }

        if (s) {
            convertData = convertData.filter((o: Post) => o.title.includes(s as string));
        }

        const dataPaging: Array<Post> = [];
        let start = (parseInt(page as string) - 1) * parseInt(limit as string);
        const end = start + parseInt(limit as string);
        while (start < end && start < convertData.length) {
            dataPaging.push(convertData[start]);
            start++;
        }

        return res.status(200).json({
            success: true,
            data: dataPaging,
            pagination: {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                total_items: convertData.length,
                total_page: Math.ceil(convertData.length / parseInt(limit as string)),
            },
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            data: e.message,
            debugger: e,
        });
    }
}
