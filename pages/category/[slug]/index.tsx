import React, { NextPageContext } from 'next';
import BlogLayout from '../../../layouts/BlogLayout';
import { getPosts } from '../../../apis/post';

const Category = ({ posts, pagination, category }: any) => {
    return <BlogLayout title={`${category} - Kevin Pham`} posts={posts} pagination={pagination} />;
};

Category.getInitialProps = async (context: NextPageContext) => {
    const { page = '1', slug } = context.query;
    const res = await getPosts({ page: page as string, category: slug as string });
    const posts = Array.isArray(res.data.data) ? res.data.data : [];
    const pagination = res.data.pagination ? res.data.pagination : null;
    const category = posts.length ? posts[0].category.label : slug;
    return { posts, pagination, category };
};

export default Category;
