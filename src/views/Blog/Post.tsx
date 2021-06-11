import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getPosts } from 'modules/blog/api';
import { Post } from 'models/Post';
import { Spinner } from 'components';
import marked from 'marked';
import { Helmet } from 'react-helmet';

const PostComponent = ({ match }: RouteComponentProps<{ slug: string }>) => {
    const { slug } = match.params;
    const [loading, setLoading] = useState<boolean>(true);
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        async function run() {
            if (loading) {
                const response = await getPosts({
                    slug,
                });

                setPost(response.data as Post);
                setLoading(false);
            }
        }

        run();
    }, [loading, slug]);

    return (
        <>
            <Helmet title={post?.title} />
            <section className='bg-gray-200 py-8'>
                <div className='container'>
                    {loading ? (
                        <div className='d-flex justify-content-center align-items-center mb-8'>
                            <Spinner type='DotLoader' />
                        </div>
                    ) : (
                        <section className='pt-8 pt-md-11'>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-12 col-md-10'>
                                        <div className='small text-gray-600 text-center mb-4'>
                                            <Link
                                                to={`/category/${post?.category}`}>{post?.category.toUpperCase()}</Link>
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
                    )}
                </div>
            </section>
        </>
    );
};

export default PostComponent;