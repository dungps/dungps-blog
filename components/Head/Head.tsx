import React from 'react';
import { default as CoreHead } from 'next/head';

interface Props {
    title: string
}

const Head = ({ title }: Props) => {
    return (
        <CoreHead>
            <meta charSet='utf-8' />
            <link rel='icon' type='image/jpeg' href='/image.jpeg' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta
                name='description'
                content="A Kevin's website"
            />
            <title>{title}</title>
            <meta property='og:url' content='https://www.dungps.com' />
            <meta property='og:locale' content='vi_VN' />
            <meta property='og:type' content='website' />
            <meta property='og:description' content="A Kevin's website" />
            <meta
                property='og:image'
                content='https://www.dungps.com/image.jpeg'
            />
            <meta property='og:title' content={title} />
            <meta property='og:site_name' content='Kevin Pham' />
        </CoreHead>
    );
};

export default Head;
