import React, { Fragment, PropsWithChildren } from 'react';

const DefaultLayout = ({ children }: PropsWithChildren<any>) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default DefaultLayout