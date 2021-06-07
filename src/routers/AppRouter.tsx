import React from "react"
import { Router, Redirect, Route, Switch } from "react-router-dom"
import { History } from "history"
import routes from "./routes"
import IRoute from "../types/Route"

interface Props {
    history: History
}

const AppRouter = ({history}: Props) => {
    return (
        <Router history={history}>
            <Switch>
                {routes.map(({ component: Component, layout: Layout, redirect, ...rest }: IRoute) => (
                    <Route
                        key={rest.path}
                        {...rest}
                        component={(appProps: any) => {
                            if (redirect) {
                                return <Redirect key={rest.path} path={rest.path} from={rest.path} to={redirect} />
                            }

                            if (Layout) {
                                return (
                                    <Layout key={rest.path} {...appProps}>
                                        <Component {...appProps} />
                                    </Layout>
                                )
                            }

                            return <Component key={rest.path} {...appProps} />
                        }}
                    />
                ))}
            </Switch>
        </Router>
    )
}

export default AppRouter