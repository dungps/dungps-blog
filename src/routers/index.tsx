import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routers from './router';
import { IRoute } from '../types/Route';
import AppRoute from './Route';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                {routers.map(({ layout: Layout, children, ...rest }: IRoute, key: number) => {
                    if (children && Layout) {
                        return (
                            <Layout key={key}>
                                <Switch>
                                    {children.map((route: IRoute, index: number) => <AppRoute {...route} />)}
                                </Switch>
                            </Layout>
                        );
                    }

                    return <AppRoute key={key} {...rest} layout={Layout} />;
                })}
            </Switch>
        </Router>
    );
};

export default AppRouter;