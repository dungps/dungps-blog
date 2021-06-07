import React from "react"
import { bootstrap, SetupBootstrap, boostrapRunner } from "../modules/bootstrap"
import { blog, SetupBlog } from "../modules/blog"

const contextData = () => {
    return {
        bootstrap: SetupBootstrap(),
        blog: SetupBlog()
    }
}

export const AppContext = React.createContext({
    bootstrap,
    blog
})

export type IAppContext = ReturnType<typeof contextData>

export const AppProvider: React.FC = ({ children }: React.PropsWithChildren<any>) => {
    const appContext = contextData()

    React.useEffect(() => {
        const run = async () => {
            const runner = [
                boostrapRunner(appContext)
            ]

            await Promise.all(runner)
        }

        run()
    })

    return (
        <AppContext.Provider value={appContext}>
            {children}
        </AppContext.Provider>
    )
}

export const AppConsumer = AppContext.Consumer