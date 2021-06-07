import { useState } from "react"
import { IAppContext } from "../../context"
import BootstrapContextState from "./types"

export const bootstrap: BootstrapContextState = {
    loading: true,
    setLoading: () => {}
}

export const SetupBootstrap = (): BootstrapContextState => {
    const [loading, setLoading] = useState<boolean>(bootstrap.loading)
    return {
        loading,
        setLoading
    }
}

export const boostrapRunner = (context: IAppContext) => {
    setTimeout(() => {
        context.bootstrap.setLoading(false)
    }, 2000)
}