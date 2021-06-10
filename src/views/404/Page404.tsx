import React from 'react';
import { DefaultLayout } from 'layouts';
import { Link, RouteComponentProps } from 'react-router-dom';

const Page404 = (props: RouteComponentProps) => {
    return (
        <DefaultLayout {...props}>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <h2>Uh Oh.</h2>
                        <p>We ran into an issue, but don’t worry, we’ll take care of it for sure.</p>
                        <Link to="/" className="btn btn-primary">Back to safety</Link>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Page404;