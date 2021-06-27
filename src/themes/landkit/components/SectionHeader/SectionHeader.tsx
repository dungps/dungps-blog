import React from 'react';

interface Props {
    title: string
    wrapperStyle?: React.CSSProperties
}

const SectionHeader = ({ title, wrapperStyle }: Props) => (
    <section className='bg-dark text-center text-white pt-8 pb-10' style={{
        background: 'url(/shape.svg) no-repeat center -80px',
        backgroundSize: 1840,
        ...wrapperStyle,
    }}>
        <div className='container'>
            <h1 className='display-3 font-weight-bold mb-0'>{title}</h1>
        </div>
    </section>
);

export default SectionHeader;