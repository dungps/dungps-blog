import DefaultLayout from '../../../layouts/DefaultLayout';
import React, { NextPageContext } from 'next';
import Link from 'next/link';
import marked from 'marked';
import Error from 'next/error';
import { getPosts } from '../../../apis/post';

const Post = ({ post, err }: any) => {

    if (err) {
        return <Error statusCode={err.statusCode} />;
    }

    return (
        <DefaultLayout title={`${post?.title} - Kevin Pham`}>
            <section className='bg-gray-200 py-8'>
                <div className='container'>
                    <section className='pt-8 pt-md-11'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className='col-12 col-md-10'>
                                    <div className='small text-gray-600 text-center mb-4'>
                                        <Link
                                            href={`/category/${post?.category}`}>{post?.category.toUpperCase()}</Link>
                                    </div>
                                    <h1 className='display-4 my-0 text-center font-weight-bold'>{post?.title}</h1>
                                </div>
                            </div>
                            <div className='row justify-content-center my-8'>
                                <div className='col-12 col-md-10 col-lg-9 col-xl-8'>
                                    <div className='entry-thumbnail'>
                                        <img src={post?.feature_image} alt={post?.title} />
                                    </div>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-12 col-md-10 col-lg-9 col-xl-8'>
                                    <div className='entry-content'
                                         dangerouslySetInnerHTML={{ __html: marked(post?.content || '', { gfm: true }) }} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </DefaultLayout>
    );
};

Post.getInitialProps = async (context: NextPageContext) => {
    const { slug } = context.query;
    const res = await getPosts({ slug: slug as string });

    if (!res.data.success) {
        return { err: { statusCode: 404 } };
    }

    return { post: res.data.data, pagination: res.data.pagination };
};

export default Post;
