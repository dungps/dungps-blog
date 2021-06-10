import { IRoute } from 'types/Route';
import { HomeComponent } from 'views';
import { DefaultLayout } from 'layouts';
import { BlogComponent, PostComponent } from '../views/Blog';

export default [
    {
        path: '/',
        component: HomeComponent,
        layout: DefaultLayout,
        exact: true,
    },
    {
        path: '/blog',
        component: BlogComponent,
        layout: DefaultLayout
    },
    {
        path: '/category/:category',
        component: BlogComponent,
        layout: DefaultLayout
    },
    {
        path: '/post/:slug',
        component: PostComponent,
        layout: DefaultLayout
    }
] as Array<IRoute>;