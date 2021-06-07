import React, { createContext, PropsWithChildren, useState, useEffect } from "react"
import BootstrapContextState from "./types"

const contextDefaultValues: BootstrapContextState = {
    loading: true
}

export const BootstrapContext = createContext<BootstrapContextState>(contextDefaultValues)

const BootstrapProvider = ({ children }: PropsWithChildren<any>) => {
    const [loading, setLoading] = useState<boolean>(contextDefaultValues.loading)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    })

    return (
        <BootstrapContext.Provider
            value={{
                loading
            }}
        >
            {children}
        </BootstrapContext.Provider>
    )
}

export default BootstrapProvider