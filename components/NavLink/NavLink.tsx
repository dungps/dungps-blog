import React from 'react';

const NavLink = React.forwardRef<any, any>(({ children, ...rest }: any, ref: any) => {
    return (
        <a ref={ref} className='nav-link' {...rest}>
            {children}
        </a>
    );
});

export default NavLink