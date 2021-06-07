import IRoute from "../types/Route";
import { BlogComponent, HomeComponent } from "../views";

export default [
    {
        path: "/",
        exact: true,
        component: HomeComponent
    },
    {
        path: "/blog",
        component: BlogComponent
    }
] as IRoute[]