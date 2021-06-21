import React, { PropsWithChildren } from 'react';
import { Head, Menu, Footer, PageHeader } from '../components';

interface Props {
    title?: string
}

const PageLayout = ({ children, title = '' }: PropsWithChildren<Props>) => {
    return (
        <>
            <Head title={`${title} - Kevin Pham`} />
            <Menu />
            <div className='main-content bg-gray-200 pb-6'>
                <PageHeader title={title} />
                <section className='mt-n6'>
                    <div className='container'>
                        <div className='card shadow-sm'>
                            <div className='card-body p-lg-10'>
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};


export default PageLayout;
