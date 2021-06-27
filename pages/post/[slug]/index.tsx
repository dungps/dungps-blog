import React from 'react'
import { NextPageContext } from 'next';
import Error from 'next/error';
import { getPosts } from '@core/apis/post';
import { SinglePage } from '@theme'

const Post = ({ err, ...rest }: any) => {
    if (err) {
        return <Error statusCode={err.statusCode} />;
    }

    return <SinglePage {...rest} />
};

Post.getInitialProps = async (context: NextPageContext) => {
    const { slug } = context.query;
    const res = await getPosts({ slug: slug as string });

    if (!res.data.success) {
        return { err: { statusCode: 404 } };
    }

    let props = {}
    if (typeof SinglePage.getInitialProps === 'function') {
        props = SinglePage.getInitialProps(context)
    }

    return { post: res.data.data, ...props };
};

export default Post;
