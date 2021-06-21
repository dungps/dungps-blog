import React from 'react'
import DefaultLayout from './DefaultLayout';
import { PageHeader, Pagination, PostItem } from '../components';
import { Post, Pagination as PaginationModel } from '../types/Post';

interface Props {
    title: string,
    posts: Array<Post>
    pagination: PaginationModel
}

const BlogLayout = ({ title, posts, pagination }: Props) => {
    return (
        <DefaultLayout title={`${title} - Kevin Pham`}>
            <PageHeader title={title} />
            <section className='bg-gray-200 py-8'>
                <div className='container'>
                    {posts && posts.length ? (
                        <>
                            <div className='row'>
                                {posts.map((post: Post, k: number) => <PostItem post={post} key={k} />)}
                            </div>
                            <Pagination pagination={pagination} />
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
        </DefaultLayout>
    );
};

export default BlogLayout;
