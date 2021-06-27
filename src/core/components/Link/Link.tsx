import React, { forwardRef, PropsWithChildren } from 'react';
import { default as CoreLink, LinkProps } from 'next/link';

interface Props {
    className?: string
}

const RefLink = forwardRef<any, PropsWithChildren<Props>>(({ children, ...rest }: any, ref: any) => (
    <a ref={ref} {...rest}>
        {children}
    </a>
));

const Link = ({ children, className, href }: PropsWithChildren<Props & LinkProps>) => (
    <CoreLink href={href} passHref>
        <RefLink className={className}>
            {children}
        </RefLink>
    </CoreLink>
);

export default Link;