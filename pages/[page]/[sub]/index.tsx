import React from 'react';
import { NextPageContext } from 'next';
import Error from 'next/error';
import { pages } from '@theme';

interface Props {
    pageIndex?: number
    error?: {
        statusCode: number
    },
    props?: any
}

const Page = ({ props, pageIndex, error }: Props) => {
    if (error || pageIndex === undefined || pageIndex === -1) {
        return <Error statusCode={error?.statusCode || 404} />
    }

    const { component: Component } = pages[pageIndex]

    if (Component) return <Component {...props} />

    return <Error statusCode={500} />
};

Page.getInitialProps = (context: NextPageContext) => {
    const { page, sub } = context.query;

    const pageIndex = pages.findIndex((o) => o.slug === `/${page}/${sub}` && !o.category)

    if (pageIndex === -1) {
        return {
            error: {
                statusCode: 404
            }
        }
    }

    const pageComponent = pages[pageIndex]

    let props = {}
    if (typeof pageComponent.component.getInitialProps === 'function') {
        props = pageComponent.component.getInitialProps(context)
    }

    return { pageIndex, props };
};

export default Page;