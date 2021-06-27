import React from 'react';
import { NextPageContext } from 'next';
import { BlogPage } from '@theme';
import { getPosts } from '@core/apis/post';

const Blog = (props: any) => {
    return <BlogPage title='Blog' {...props} />;
};

Blog.getInitialProps = async (context: NextPageContext) => {
    const { page = '1' } = context.query;
    const res = await getPosts({ page: page as string });

    let props = {}
    if (typeof BlogPage.getInitialProps === 'function') {
        props = BlogPage.getInitialProps(context)
    }

    return { posts: res.data.data, pagination: res.data.pagination, page, ...props };
};

export default Blog;
