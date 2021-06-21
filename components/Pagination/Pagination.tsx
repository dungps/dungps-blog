import React from 'react';
import { Pagination } from '../../types/Post';
import { useRouter } from 'next/router';

interface Props {
    pagination: Pagination
}

const BlogPagination = ({ pagination }: Props) => {
    const router = useRouter();

    const onClick = (page: number | string) => router.replace(`?page=${page}`);

    return (
        <div className='row'>
            <div className='col-md-6'>
                {pagination.page > 1 && pagination.page <= pagination.total_page ?
                    <button className='btn btn-secondary btn-sm float-left'
                            onClick={() => onClick(pagination.page - 1)}>&lt;&lt; Newest Post</button> : null}
            </div>
            <div className='col-md-6'>
                {pagination.page < pagination.total_page ? <button className='btn btn-secondary btn-sm float-right'
                                                                   onClick={() => onClick(pagination.page + 1)}>Oldest
                    Post &gt;&gt;</button> : null}
            </div>
        </div>
    );
};

export default BlogPagination;
