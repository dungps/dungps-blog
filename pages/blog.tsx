import { NextPageContext } from 'next';
import DefaultLayout from '../layouts/DefaultLayout';
import { Post } from '../types/Post';
import { PageHeader, Pagination, PostItem } from '../components';

const Blog = ({ posts, pagination }: any) => {
    return (
        <DefaultLayout title={`Blog - Kevin Pham`}>
            <PageHeader
                title='Blog'
                wrapperStyle={{
                    background: 'url(/shape.svg) no-repeat center -80px',
                    backgroundSize: 1840,
                }}
            />
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

Blog.getInitialProps = async (context: NextPageContext) => {
    const isDev = process.env.NODE_ENV !== 'production';
    const { page = '1' } = context.query;
    const domain = isDev ? 'http://localhost:3000' : 'https://www.dungps.com';
    const res = await fetch(`${domain}/api/post?page=${page}`);
    const content = await res.json();
    return { posts: content.data, pagination: content.pagination, page };
};

export default Blog;