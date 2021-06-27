import React from 'react'
import Default from './layouts/Default';
import { SectionHeader, Pagination as PaginationComponent, PostItem } from './components';
import { Post, Pagination } from '@core/types/Post';
import { NextComponentType } from 'next/dist/next-server/lib/utils';
import { NextPageContext } from 'next';

interface Props {
    title: string
    posts: Array<Post>
    pagination: Pagination
}

const Blog: NextComponentType<NextPageContext, any, Props> = ({ title, posts, pagination }: Props) => {
    return (
        <Default title={title}>
            <SectionHeader title={title} />
            <section className='bg-gray-200 py-8'>
                <div className='container'>
                    {posts && posts.length ? (
                        <>
                            <div className='row'>
                                {posts.map((post: Post, k: number) => <PostItem post={post} key={k} />)}
                            </div>
                            <PaginationComponent pagination={pagination} />
                        </>
                    ) : (
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3>No post found.</h3>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Default>
    )
}

export default Blog