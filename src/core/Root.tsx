import React from 'react'
import { History } from "history"
import BootstrapProvider from '../modules/bootstrap'
import App from "./App"

interface Props {
    history: History
}

const Root = ({ history }: Props) => {
    return (
        <BootstrapProvider>
            <App history={history} />
        </BootstrapProvider>
    )
}

export default Root;
