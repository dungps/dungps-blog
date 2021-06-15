import Link from 'next/link';
import { Post } from '../../types/Post';
import ItemLink from './ItemLink';

interface Props {
    post: Post
}

const Item = ({ post }: Props) => {
    return (
        <div className='col-12 col-md-6 col-lg-4 d-flex d-flex'>
            <article className='card mb-6 shadow-light-lg lift lift-lg post'>
                <Link href={`/post/${post.slug}`}>
                    <img src={post.feature_image} alt={post.title} width={730} height={382} />
                </Link>
                <div className='card-body'>
                    <Link href={`/post/${post.slug}`} passHref>
                        <ItemLink>
                            <h2 className='h4 mb-0 font-weight-bold text-dark'>{post.title}</h2>
                        </ItemLink>
                    </Link>
                </div>
                <div className='card-meta mt-auto'>
                    <hr className='card-meta-divider' />
                    <div className='small'>
                        <Link href={`/category/${post.category}`}>{post.category.toUpperCase()}</Link>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Item;