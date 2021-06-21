import React, { PropsWithChildren } from 'react';
import { Footer, Menu, Head } from '../components';

interface Props {
    title?: string
}

const DefaultLayout = ({ children, title = 'Kevin Pham' }: PropsWithChildren<Props>) => {

    return (
        <>
            <Head title={title} />
            <Menu />
            <div className='main-content'>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
