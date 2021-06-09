import { IRoute } from 'types/Route';
import { HomeComponent } from 'views';
import { DefaultLayout } from 'layouts';

export default [
    {
        path: '/',
        component: HomeComponent,
        layout: DefaultLayout,
        exact: true,
    },
] as Array<IRoute>;