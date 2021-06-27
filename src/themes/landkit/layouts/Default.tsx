import React, { PropsWithChildren } from 'react';
import { Head } from '../../../core/components'
import { Header, Footer } from '../components'

interface Props {
    title: string
    wrapperClassName?: string
}

const Default = ({ title, wrapperClassName, children }: PropsWithChildren<Props>) => (
    <>
        <Head title={`${title} - Kevin Pham`} />
        <Header />
        <div className={`main-content ${wrapperClassName}`}>
            {children}
        </div>
        <Footer />
    </>
)

export default Default