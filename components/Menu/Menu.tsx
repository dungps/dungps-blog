import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from '../NavLink';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const menus = [
    {
        to: '/blog',
        label: 'Blog',
        map: ['blog', 'post'],
    },
    {
        to: '/about',
        label: 'About me',
        map: ['about'],
    },
];

const BrandLink = React.forwardRef<any, any>(({ children, ...rest }: any, ref: any) => {
    return (
        <a ref={ref} className='navbar-brand fade-page' {...rest}>
            {children}
        </a>
    );
});

const Menu = () => {
    const [show, setShow] = useState<boolean>(false);

    const router = useRouter();

    const isMap = (data: string | Array<string>) => {
        if (Array.isArray(data)) {
            for (const mapData of data) {
                if (router.pathname.includes(mapData)) {
                    return true;
                }
            }

            return false;
        }

        return router.pathname.includes(data);
    };

    return (
        <header className='navbar navbar-expand-lg navbar-light bg-white'>
            <div className='container'>
                <Link href='/' passHref>
                    <BrandLink>
                        Kevin Pham
                    </BrandLink>
                </Link>
                <button type='button' className='navbar-toggler' onClick={() => setShow(!show)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <nav id='site-navigation' className={`collapse navbar-collapse ${show ? 'show' : ''}`}>
                    <button className='navbar-toggler' onClick={() => setShow(!show)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <ul className='ml-auto navbar-nav'>
                        {menus.map((m, k) => {
                            return (
                                <li className={`nav-item ${isMap(m.map) ? 'active' : ''}`} key={k}>
                                    <Link href={m.to} passHref>
                                        <NavLink>{m.label}</NavLink>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Menu;
