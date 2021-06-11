import { IRoute } from 'types/Route';
import { HomeComponent, Page404Component } from 'views';
import { DefaultLayout } from 'layouts';
import { BlogComponent, PostComponent } from '../views/Blog';

export default [
    {
        path: '/',
        component: HomeComponent,
        layout: DefaultLayout,
        exact: true,
        helmet: {
            title: 'Home'
        }
    },
    {
        path: '/blog',
        component: BlogComponent,
        layout: DefaultLayout,
        helmet: {
            title: 'Blog'
        }
    },
    {
        path: '/category/:category',
        component: BlogComponent,
        layout: DefaultLayout,
        helmet: {
            title: (appRoute: any) => `Category: ${appRoute.match?.params?.category}`
        }
    },
    {
        path: '/post/:slug',
        component: PostComponent,
        layout: DefaultLayout,
    },
    {
        path: '*',
        component: Page404Component,
        showBackButton: true,
    },
] as Array<IRoute>;