import React from 'react';
import { Link } from 'react-router-dom';
import img from 'assets/img/illustration-1.png';

interface Props {
    showBackButton?: boolean
}

const Page404 = ({ showBackButton }: Props) => {
    return (
        <section className='section-border border-primary'>
            <div className='container d-flex flex-column'>
                <div className='row align-items-center justify-content-center no-gutters min-vh-100'>
                    <div className='col-8 col-md-6 col-lg-7 offset-md-1 order-md-2 mt-auto mt-md-0 pt-8 pb-4 py-md-11'>
                        <img src={img} alt='' className='img-fluid' />
                    </div>
                    <div className='col-12 col-md-5 col-lg-4 order-md-1 mb-auto mb-md-0 pb-8 py-md-11'>
                        <h1 className='display-3 font-weight-bold text-center'>
                            Uh Oh.
                        </h1>
                        <p className='mb-5 text-center text-muted'>
                            We ran into an issue, but don’t worry, we’ll take care of it for sure.
                        </p>
                        {showBackButton ? (<div className='text-center'>
                            <Link className='btn btn-primary' to='/'>
                                Back to safety
                            </Link>
                        </div>) : null}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page404;