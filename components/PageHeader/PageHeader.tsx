import React from 'react';

interface Props {
    title: string,
    wrapperStyle?: React.CSSProperties
}

const PageHeader = ({ title, wrapperStyle }: Props) => {
    return (
        <section className='bg-dark text-center text-white pt-8 pb-10' style={wrapperStyle}>
            <div className='container'>
                <h1 className='display-3 font-weight-bold mb-0'>{title}</h1>
            </div>
        </section>
    );
};

export default PageHeader;