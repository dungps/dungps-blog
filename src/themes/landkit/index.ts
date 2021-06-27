import { PageProps } from '@core/types/Page';
import { About } from './pages';

export const pages = [
    {
        slug: '/about',
        component: About,
    },
] as Array<PageProps>;

export { default as HomePage } from './Home';
export { default as BlogPage } from './Blog';
export { default as SinglePage } from './Single';