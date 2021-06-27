import React from 'react';
import Default from './layouts/Default';
import styles from './assets/scss/modules/Home.module.css';
import { NextComponentType } from 'next/dist/next-server/lib/utils';
import { NextPageContext } from 'next';

const Home: NextComponentType<NextPageContext, any, any> = () => (
    <Default title={'Home'}>
        <section
            className='fw-main-row pt-7 pb-9 pt-md-12 pb-14 pb-md-15 bg-dark text-center text-white position-relative'
            style={{
                backgroundImage: `url(/bg-img.jpg)`,
                backgroundPosition: 'top center',
                backgroundSize: 'cover',
            }}
        >
            <div className={styles.overlay} />
            <div className='container d-flex align-items-center justify-content-center' style={{ minHeight: 730 }}>
                <div className='row' data-aos='fade-up'>
                    <div className='col-xl-12'>
                        <h1 className='display-3 font-weight-bold mx-0 mx-xl-11 text-uppercase'>
                            Hi, I'm Kevin Pham
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    </Default>
);

export default Home;