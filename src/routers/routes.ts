import { DefaultLayout } from "../layouts";
import IRoute from "../types/Route";
import { BlogComponent, HomeComponent } from "../views";

export default [
    {
        path: "/",
        exact: true,
        component: HomeComponent,
        layout: DefaultLayout
    },
    {
        path: "/blog",
        component: BlogComponent,
        layout: DefaultLayout
    }
] as IRoute[]