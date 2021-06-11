import React from 'react';
import Provider from './context/provider';
import App from './App';
import ErrorHandler from './ErrorHandler';
import { Helmet } from 'react-helmet';
import ogImage from "assets/img/og-img.jpg"

const Root = () => {
    return (
        <ErrorHandler>
            <Provider>
                <Helmet
                    htmlAttributes={{ lang: 'vi' }}
                    defaultTitle='Kevin Pham'
                    titleTemplate='%s - Kevin Pham'
                >
                    <meta property='og:url' content={window.location.href} />
                    <meta property='og:locale' content='vi_VN' />
                    <meta property='og:type' content='website' />
                    <meta property='og:description' content="A Kevin's website" />
                    <meta
                        property='og:image'
                        content={`${window.location.protocol}//${window.location.host}${ogImage}`}
                    />
                    <meta property='og:site_name' content='Kevin Pham' />
                    <meta name='description' content="A Kevin's website" />
                </Helmet>
                <App />
            </Provider>
        </ErrorHandler>
    );
};

export default Root;