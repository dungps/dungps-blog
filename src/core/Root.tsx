import React from 'react'
import { History } from "history"
import { AppProvider } from "../context"
import App from "./App"

interface Props {
    history: History
}

const Root = ({ history }: Props) => {
    return (
        <AppProvider>
            <App history={history} />
        </AppProvider>
    )
}

export default Root;
