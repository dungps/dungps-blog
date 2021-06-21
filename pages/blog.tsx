import React from 'react';
import { NextPageContext } from 'next';
import BlogLayout from '../layouts/BlogLayout';
import { getPosts } from '../apis/post';

const Blog = ({ posts, pagination }: any) => {
    return <BlogLayout title='Blog' posts={posts} pagination={pagination} />;
};

Blog.getInitialProps = async (context: NextPageContext) => {
    const { page = '1' } = context.query;
    const res = await getPosts({ page: page as string });
    return { posts: res.data.data, pagination: res.data.pagination, page };
};

export default Blog;
