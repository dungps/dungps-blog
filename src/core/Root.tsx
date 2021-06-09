import React from "react"
import Provider from './context/provider';
import App from './App';

const Root = () => {
    return (
        <Provider>
            <App />
        </Provider>
    )
}

export default Root