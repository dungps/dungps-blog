import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IRoute } from 'types/Route';

const AppRoute = ({ component: Component, layout: Layout, redirect, ...rest }: IRoute) => {
    return (
        <Route
            {...rest}
            component={(appRoute: any) => {
                if (redirect) {
                    return <Redirect to={redirect} from={rest.path} />;
                }

                if (Layout && Component) {
                    return (
                        <Layout {...appRoute}>
                            <Component {...appRoute} />
                        </Layout>
                    );
                }

                if (Component) {
                    return <Component {...appRoute} />;
                }

                return <h1>Missing component</h1>;
            }}
        />
    );
};

export default AppRoute;