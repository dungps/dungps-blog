import React from 'react';

const ItemLink = React.forwardRef<any, any>(({ children, ...rest }: any, ref: any) => {
    return (
        <a ref={ref} className='text-decoration-none' {...rest}>
            {children}
        </a>
    );
});

export default ItemLink;
