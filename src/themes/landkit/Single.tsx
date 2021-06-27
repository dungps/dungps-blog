import React from 'react';
import { NextComponentType } from 'next/dist/next-server/lib/utils';
import Default from './layouts/Default';
import Link from 'next/link';
import marked from 'marked';
import { Post } from '@core/types/Post';
import { NextPageContext } from 'next';

interface Props {
    post: Post
}

const Single: NextComponentType<NextPageContext, any, any> = ({ post }: Props) => {
    return (
        <Default title={post.title}>
            <section className='bg-gray-200 py-8'>
                <div className='container'>
                    <section className='pt-8 pt-md-11'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className='col-12 col-md-10'>
                                    <div className='small text-gray-600 text-center mb-4'>
                                        <Link
                                            href={`/category/${post.category.slug}`}>{post.category.label.toUpperCase()}</Link>
                                    </div>
                                    <h1 className='display-4 my-0 text-center font-weight-bold'>{post.title}</h1>
                                </div>
                            </div>
                            <div className='row justify-content-center my-8'>
                                <div className='col-12 col-md-10 col-lg-9 col-xl-8'>
                                    <div className='entry-thumbnail'>
                                        <img src={post.feature_image} alt={post.title} />
                                    </div>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-12 col-md-10 col-lg-9 col-xl-8'>
                                    <div className='entry-content'
                                         dangerouslySetInnerHTML={{ __html: marked(post.content || '', { gfm: true }) }} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </Default>
    );
};

export default Single;