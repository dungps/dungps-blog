import React, { NextPageContext } from 'next';
import { getPosts } from '@core/apis/post';
import { pages, BlogPage } from '@theme'

const Category = ({ pageIndex, category, ...rest }: any) => {
    if (pageIndex === -1) {
        return <BlogPage {...rest} title={`Category: ${category}`} />
    }

    const { component: Component } = pages[pageIndex]

    return <Component {...rest} />
};

Category.getInitialProps = async (context: NextPageContext) => {
    const { page = '1', slug } = context.query;
    const res = await getPosts({ page: page as string, category: slug as string });
    const posts = Array.isArray(res.data.data) ? res.data.data : [];
    const pagination = res.data.pagination ? res.data.pagination : null;
    const category = posts.length ? posts[0].category.label : slug;
    let props = {}

    const pageIndex = pages.findIndex((o) => o.slug === slug && o.category)

    if (pageIndex > -1) {
        const pageComponent = pages[pageIndex]
        if (typeof pageComponent.component.getInitialProps === 'function') {
            props = pageComponent.component.getInitialProps(context)
        }
    }

    return { posts, pagination, category, pageIndex, ...props };
};

export default Category;
