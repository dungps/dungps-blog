import React from 'react';
import '../styles/app.scss';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Spotify } from '../components';
import { getBootstrap } from '../apis/bootstrap';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Spotify spotify={pageProps.bootstrap.spotify} />
        </>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);

    const res = await getBootstrap();

    appProps.pageProps['bootstrap'] = res.data.data;

    return { ...appProps };
};

export default MyApp;
