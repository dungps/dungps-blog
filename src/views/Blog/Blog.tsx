import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getPosts } from 'modules/blog/api';
import { Post } from 'models/Post';
import { PageHeader, Spinner } from '../../components';
import Item from './components/Item';
import bg from 'assets/img/shape.svg';

interface Props {

}

const BlogComponent = ({ match, history }: RouteComponentProps<{ category?: string, tag?: string }, Props>) => {
    const { category, tag } = match.params;
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        async function run() {
            if (loading) {
                const result = await getPosts({
                    category,
                    tag,
                    limit: 10,
                    page,
                });
                setPosts(result.data as Array<Post>);
                setCanLoadMore(page < (result.pagination?.total_page || 0));
                setLoading(false);
            }
        }

        run();
    }, [category, loading, page, tag]);

    const loadMorePost = async () => {
        if (canLoadMore) {
            const currentPage = page;
            setPage(currentPage + 1);
            setLoadMore(true);
            try {
                const result = await getPosts({
                    category,
                    tag,
                    limit: 10,
                    page: currentPage + 1,
                });
                setPosts([...posts, ...(result.data as Array<Post>)]);
                setCanLoadMore(currentPage + 1 < (result.pagination?.total_page || 0));
            } catch (err) {
                setCanLoadMore(false);
            }
            setLoadMore(false);
        }
    };

    const getTitle = () => {
        if (category) {
            return `Category: ${category}`;
        }

        if (tag) {
            return `Tags: ${tag}`;
        }

        return 'Blog';
    };

    return (
        <>
            <PageHeader title={getTitle()} wrapperStyle={{
                background: `url(${bg}) no-repeat center -80px`,
                backgroundSize: 1840,
            }} />
            <section className='bg-gray-200 py-8'>
                <div className='container'>
                    {loading ? (
                        <div className='d-flex justify-content-center align-items-center mb-8'>
                            <Spinner type='DotLoader' />
                        </div>
                    ) : posts.length ? (
                        <>
                            <div className='row'>
                                {posts.map((post, k) => <Item post={post} key={k} />)}
                            </div>
                            {canLoadMore ? (
                                <div className='row d-flex justify-content-center'>
                                    <div className='col-4 d-flex justify-content-center'>
                                        <button className='btn btn-primary btn-block' onClick={loadMorePost}
                                                disabled={loadMore}>
                                            Load more
                                        </button>
                                    </div>
                                </div>
                            ) : null}
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
        </>
    );
};

export default BlogComponent;