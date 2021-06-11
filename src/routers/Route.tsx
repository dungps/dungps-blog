import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IRoute } from 'types/Route';
import { Page404Component } from '../views';
import { Helmet } from 'react-helmet';

const getHelmetTitle = (title: string | Function, appRoute: any) => {
    if (typeof title === 'function') {
        return title(appRoute)
    }

    return title
}

const AppRoute = ({ component: Component, layout: Layout, redirect, helmet, ...rest }: IRoute) => {
    return (
        <Route
            {...rest}
            component={(appRoute: any) => {
                if (redirect) {
                    return <Redirect to={redirect} from={rest.path} />;
                }

                if (Layout && Component) {
                    return (
                        <>
                            {helmet ? <Helmet title={getHelmetTitle(helmet.title, appRoute)} /> : null}
                            <Layout {...appRoute} {...rest} >
                                <Component {...appRoute} {...rest} />
                            </Layout>
                        </>
                    );
                }

                if (Component) {
                    return (
                        <>
                            {helmet ? <Helmet title={getHelmetTitle(helmet.title, appRoute)} /> : null}
                            <Component {...appRoute} {...rest} />
                        </>
                    );
                }

                return (
                    <>
                        {helmet ? <Helmet title={getHelmetTitle(helmet.title, appRoute)} /> : null}
                        <Page404Component {...appRoute} />
                    </>
                );
            }}
        />
    );
};

export default AppRoute;