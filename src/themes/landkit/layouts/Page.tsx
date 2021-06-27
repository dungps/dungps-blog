import React, { PropsWithChildren } from 'react';
import Default from './Default';
import { SectionHeader } from '../components';

interface Props {
    title: string
}

const Page = ({ title, children }: PropsWithChildren<Props>) => (
    <Default title={title} wrapperClassName={'bg-gray-200 pb-6'}>
        <SectionHeader title={title} />
        <section className='mt-n6'>
            <div className='container'>
                <div className='card shadow-sm'>
                    <div className='card-body p-lg-10'>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    </Default>
)

export default Page