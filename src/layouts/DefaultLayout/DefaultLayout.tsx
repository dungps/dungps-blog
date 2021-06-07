import React, { Fragment } from "react"

const DefaultLayout = ({ children }: React.PropsWithChildren<any>) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default DefaultLayout