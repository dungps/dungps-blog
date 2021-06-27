import React from 'react';
import { HomePage } from '@theme';
import { NextPageContext } from 'next';

const Home = (props: any) => {
    return <HomePage {...props} />;
};

Home.getInitialProps = (context: NextPageContext) => {
    let props = {};
    if (typeof HomePage.getInitialProps === 'function') {
        props = Home.getInitialProps(context);
    }

    return props;
};

export default Home;
